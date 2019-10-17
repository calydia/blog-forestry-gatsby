---
category:
- Tech
type: blog-post
title: Drupal 8 and Kubernetes
path: "/tech/drupal-8-and-kubernetes"
post_date: 2019-10-17T00:00:00+03:00
main_image: "/uploads/kubernetes-main.jpg"
listing_image: "/uploads/kubernetes-thumb.jpg"
image_alt_text: Kubernetes logo
body: |-
  <p>The development of my Drupal 8 site is done with <a href="https://wodby.com/docs/stacks/drupal/local/" title="">Docker4Drupal by Wodby</a>. This is a familiar tool for me because we use Docker4Drupal as a base for our local environments at Karhu Helsinki as well.</p><p>This post is written by my fiancé since he was the mastermind behind the whole Kubernetes hosting. I learned a lot from this project and also from this blog post; I appreciate the time he took to help me with the hosting and also the time he took to help me out with this blog post.</p><h2>Hosting a Drupal 8 site on Kubernetes</h2><p>While there are multiple options for how to host a PHP site, we opted for going with self-hosted Kubernetes. It doesn't make that much sense, but as the industry is embracing Kubernetes, this seemed like a good opportunity to try it out for a PHP site.</p><p>After a bit of googling, it became quite clear that the task wasn't that straight forward. A dockerized PHP site usually runs with a separate PHP-FPM and either NGINX or Apache webserver. While doing the development work this is not an issue at all as site files are mounted via volumes to both containers. However, for a production environment, this was not that easy. These were the options I came up with:</p><h3>Option 1 - Site files on a PV</h3><p>To have the same files on both containers, they could be mounted with a PV (Persistent Volume). While this would work, at least maintainability would suffer as changes and upgrades would need to be handled by either accessing the files from the host or where ever the PVs would be available.</p><h3>Option 2 - Site files inside the image combined PHP-FPM and NGINX</h3><p>According to googling, this seemed to be a surprisingly common way of running PHP. While also this would work, this is against the containerised application principle that a container should include only one application.</p><h3>Option 3 - Site files on an anonymous volume</h3><p>Usually, container volumes are a synonym for mounting a file or a path from the container host to inside the running container. Well, they can be also anonymous, meaning the container runtime will create an empty volume and mount that inside the container, or in our case to multiple containers. The directory on the container host is defined in container runtime's configuration, usually somewhere under /var/lib. But if it's empty, where are the site files? Well, nowhere yet. One option could be to have the site files inside the image and copy them as the container starts like in <a href="https://medium.com/containerum/how-to-easily-deploy-a-drupal-8-instance-on-kubernetes-b90acc7786b" title="">this example</a>, but Init Containers can do much more.</p><p>So we went with option 3. To get the site files from GitHub we run an Init Container to pull the files. After that is done, there's another Init Container which runs Composer and Drush. After both Init Containers are done, PHP-FPM and NGINX start with all the files in place. This works surprisingly well. Content files such as pictures and so on are mounted from a normal PV.</p><p>Init section in the deployment looks like this:</p><pre><code>initContainers:
    - name: init-1
      image: wodby/drupal-php:7.3
      command: ["/bin/bash", "-c", "--"]
      args:
        - cd /var/www/html;
          git clone https://github.com/calydia/portfolio.git;
          mv portfolio/src/* /var/www/html/;
          rm -rf portfolio;
          composer install --no-dev --no-interaction;
      volumeMounts:
        - name: portfolio-app-code
          mountPath: "/var/www/html"
    - name: init-2
      image: wodby/drupal-php:7.3
      command: ["/bin/bash", "-c", "--"]
      args:
        - cd /var/www/html;
          drush updb -y;
          drush cim -y;
          drush cr -y;
      volumeMounts:
        - name: portfolio-app-files
          mountPath: /var/www/html/web/sites/default/files
        - name: portfolio-app-settings-php-secret
          mountPath: /var/www/html/web/sites/default/settings.php
          subPath: settings.php
        - name: portfolio-app-code
          mountPath: "/var/www/html"</code></pre><h2>Production grade images</h2><p>As stated in the beginning, development is done with Docker4Drupal. I first tried with upstream PHP-FPM and NGINX from Docker Hub, but it didn't take that long to figure out that PHP sites require more specific configuration to both PHP-FPM and NGINX. Wodby has put a lot of effort to have NGINX configured in an optimal way, and same goes for PHP-FPM, so it was quite a relief to find out that <a href="https://drupal.stackexchange.com/questions/228416/using-docker4drupal-in-production-vs-its-commercial-wodby-solution" title="">the images could be used for production</a> as well. Only thing, though, was that tags were chosen to be a bit more stable like "php:7.3" instead of "7.3-dev-4.13.12". Also, as the PHP-FPM image already included PHP tooling like Composer and Drush for Drupal, the same image can be used as Init Container.</p><p>All this together the deployment yaml looks like this:</p><pre><code>---
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: portfolio-app-ingress
    namespace: default
    annotations:
      kubernetes.io/ingress.class: traefik
      certmanager.k8s.io/issuer: "letsencrypt-prod"
      certmanager.k8s.io/acme-challenge-type: http01
      traefik.ingress.kubernetes.io/frontend-entry-points: http,https
      traefik.ingress.kubernetes.io/redirect-entry-point: https
      traefik.ingress.kubernetes.io/redirect-permanent: "true"
  spec:
    tls:
      - hosts:
          - drupal.sanna.ninja
        secretName: drupal.sanna.ninja-tls
    rules:
      - host: drupal.sanna.ninja
        http:
          paths:
            - path: /
              backend:
                serviceName: portfolio-app-svc
                servicePort: nginx
  ---
  apiVersion: v1
  kind: Service
  metadata:
    name: portfolio-app-svc
    namespace: default
  spec:
    ports:
      - name: nginx
        port: 80
    selector:
      app: portfolio-app
  ---
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: portfolio-app-files-pvc
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 10Gi
  ---
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: portfolio-app
  spec:
    selector:
      matchLabels:
        app: portfolio-app
    strategy:
      type: RollingUpdate
      rollingUpdate:
        maxSurge: 100%
        maxUnavailable: 25%
    template:
      metadata:
        labels:
          app: portfolio-app
      spec:
        containers:
          - name: php-fpm
            image: wodby/drupal-php:7.3
            env:
              - name: PHP_FPM_USER
                value: "wodby"
              - name: PHP_FPM_GROUP
                value: "wodby"
              - name: COLUMNS
                value: "80"
            volumeMounts:
              - name: portfolio-app-files
                mountPath: /var/www/html/web/sites/default/files
              - name: portfolio-app-settings-php-secret
                mountPath: /var/www/html/web/sites/default/settings.php
                subPath: settings.php
              - name: portfolio-app-code
                mountPath: "/var/www/html"
          - name: nginx
            image: wodby/nginx:1.16
            env:
              - name: NGINX_BACKEND_HOST
                value: "localhost"
              - name: NGINX_SERVER_ROOT
                value: "/var/www/html/web"
              - name: NGINX_VHOST_PRESET
                value: "drupal8"
            volumeMounts:
              - name: portfolio-app-files
                mountPath: /var/www/html/web/sites/default/files
              - name: portfolio-app-code
                mountPath: "/var/www/html"
        initContainers:
          - name: init-1
            image: wodby/drupal-php:7.3
            command: ["/bin/bash", "-c", "--"]
            args:
              - cd /var/www/html;
                git clone https://github.com/calydia/portfolio.git;
                mv portfolio/src/* /var/www/html/;
                rm -rf portfolio;
                composer install --no-dev --no-interaction;
            volumeMounts:
              - name: portfolio-app-code
                mountPath: "/var/www/html"
          - name: init-2
            image: wodby/drupal-php:7.3
            command: ["/bin/bash", "-c", "--"]
            args:
              - cd /var/www/html;
                drush updb -y;
                drush cim -y;
                drush cr -y;
            volumeMounts:
              - name: portfolio-app-files
                mountPath: /var/www/html/web/sites/default/files
              - name: portfolio-app-settings-php-secret
                mountPath: /var/www/html/web/sites/default/settings.php
                subPath: settings.php
              - name: portfolio-app-code
                mountPath: "/var/www/html"
        volumes:
          - name: portfolio-app-files
            persistentVolumeClaim:
              claimName: portfolio-app-files-pvc
          - name: portfolio-app-settings-php-secret
            secret:
              secretName: portfolio-secret
          - name: portfolio-app-code
            emptyDir: {}</code></pre><h2>Deployment automation with CircleCI</h2><p>With the Init Containers, there's no need to build images. And because of that the deployment is very easy - just rollout the latest with kubectl and it will always pull the latest from GitHub. So the only thing CircleCI does is to trigger this rollout with kubectl. In the deployment yaml there's RollingUpdate instead of Recreate. With that, the application never goes down during a deployment.</p><p>CircleCI config looks like this:</p><pre><code>version: 2
  jobs:
    deploy:
    docker:
      - image: docker:stable
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Install dependencies
          command: |
            apk add curl
            curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
            chmod +x ./kubectl
            mv ./kubectl /usr/local/bin/kubectl
      - run:
          name: Deploy to Kubernetes
          command: |
            kubectl --server=${KUBE_HOST} --token=${KUBE_BEARER_TOKEN} --insecure-skip-tls-verify -n ${KUBE_NAMESPACE} rollout restart deployment ${KUBE_DEPLOYMENT_NAME}

  workflows:
    version: 2
    build_and_deploy:
      jobs:
        - deploy:
            filters:
              branches:
                only: master</code></pre><p>That's it. Now when new code is pushed to master branch in GitHub, then roughly 3 minutes and the changes are live on self-hosted Kubernetes.</p><h2>Portability</h2><p>If the site would be migrated to some other Kubernetes cluster, not much would change. Files and Database would need to be backed up and copied over, and Ingress would be something cluster-specific. Other than that nothing else would need to be changed. Well, CircleCI would need updated environment variables too.</p><h2>Scaling</h2><p>With the current configuration, the site could scale quite easily, but the MariaDB database is a single instance and would be shared between the site instances. That would most likely become an issue for writes. Also, High Availability has not been looked into at all at this point. Maybe in the future.</p><h2>Final thoughts</h2><p>Was this worth it? I would say so. I learned a lot about running a PHP application and while Kubernetes was already familiar, additional practice is never a bad thing. With Kubernetes things go forward super fast and after getting the hosting solution done, I've learnt about a project called <a href="https://openlitespeed.org/" title="">OpenLiteSpeed</a> which sounds very interesting. The solution would be more like Option 2 from earlier from this blog post, but when it's endorsed by this kind of project, it couldn't be that bad, could it?</p><p></p><p></p>
photo_credits: ''
meta_description: One way to host a Drupal 8 site with Kubernetes

---
