---
category:
- Tech
type: blog-post
title: Comparison of my two portfolios
path: "/tech/portfolio-comparison"
post_date: 2019-09-09T21:00:00.000+00:00
main_image: "/uploads/drupal-gatsby-main.jpg"
listing_image: "/uploads/drupal-gatsby-thumb.jpg"
body: <p>I created two versions of my portfolio. With the first (and the official)
  one, I wanted to try out Gatsby for the first time. At a tech meet up during the
  summer I heard people talking about having Drupal as a data source for Gatsby. As
  a Drupal developer, I wanted to give it a go. That way I could focus my learning
  more on Gatsby.</p><p>If you aren't familiar with Drupal and Gatsby you can <a href="https://www.drupal.org/"
  title="">learn more about Drupal</a> and <a href="https://www.gatsbyjs.org/" title="">learn
  more about Gatsby</a>. But in short, Drupal is an open source CMS and Gatsby is
  a open source framework based on React.</p><p>After starting the project, I decided
  to use the Drupal as its own site as well. Because it would give me the opportunity
  to compare working with only Drupal and working with more modern solutions.</p><p>Developing
  both sites was relatively easy since I could plan my content and site structure
  to be quite simple. And I prefer simpler solutions, anyway, so that wasn't really
  an issue for me.</p><p>There were some problems with getting the local environment
  up and running and the Drupal installed. Luckily my fiancé was around to help me
  with those issues. He is an expert with Docker and pretty much all kinds of things
  on the server-side. Gatsby's installation was much easier. And one thing I love
  about Gatsby is its excellent documentation. Most of the documentation is very newbie
  friendly. And the community is very welcoming.</p><p>The big difference came when
  it was time to host the sites. I outsourced the hosting setup to my fiancé. He fought
  with the setup for days, trying to make it as good as possible without too many
  compromises. The difficulties with the Drupal site were mostly because of PHP. I
  had originally planned to set up the Gatsby version on Netlify, but he suggested
  it could coexist with the Drupal site. That way I could also better see the differences
  in the sites' speed and all those juicy bits. It was a good idea so that became
  the plan. The Drupal is hosted with Kubernetes.</p><p>The Drupal site uses the <a
  href="https://www.drupal.org/project/build_hooks" title="">Build hooks module</a>
  to trigger the Gatsby site's build hook when content changes.</p><p>The Lighthouse
  audit results on my local machine have huge differences in performance. The Drupal
  version got 37 (mobile) and 38 (desktop) on perfomance while the Gatsby version
  100 on both. The Drupal is running with Docker4Drupal setup. I had noticed that
  the local Drupal was slow but in my case they often are so I paid it no attention.
  It wasn't that important with this project since the site is very small.</p><p>On
  the server side the Drupal version got 98 (mobile) and 100 (desktop) points in performance.
  So good job on the hosting side of things. The site is pretty simple, though, so
  I was expecting pretty good results. I'd like to know the difference when working
  with larger projects, so maybe I will need to come up with a large project at some
  point.</p><p>If you're interested in the sites, <a href="https://drupal.sanna.ninja"
  title="">the Drupal portfolio is located here</a> and <a href="https://sanna.ninja"
  title="">the Gatsby portfolio is located here</a>.</p>
photo_credits: ''
image_alt_text: Drupal 8 and Gatsby logos
meta_description: Comparing Drupal and Gatsby from a portfolio point of view.

---
