---
category:
- Tech
type: blog-post
title: Creating almost identical Drupal sites
path: "/tech/creating-almost-identical-drupal-sites"
post_date: 2019-10-13T00:00:00+03:00
main_image: "/uploads/html-code-main-1.jpg"
listing_image: "/uploads/html-code-thumb-1.jpg"
image_alt_text: HTML code
body: "<p>I'm currently working on a Drupal 8 site that is almost identical with another
  Drupal 8 site. They still had a lot of differences between them but most of the
  content types and settings were at least very similar. I had three options to create
  the site: Duplicate the original site, import configs from the original site to
  a new site or create a new site and create everything from scratch. The last option
  wasn't really possible for the project at all because of the deadline. I didn't
  have time to re-create everything. The first option wasn't so great either because
  the original site has the default language of Finnish (I recommend always having
  English as a default language if possible) and the new site needed to default English.
  If I was to duplicate the site, I would have had to start messing with the default
  language settings, which isn't really that recommended with a completed site.  You
  can mess with a local site's language settings but there can be trouble. The real
  risk comes if you mess with a production site. You also risk having multiple language
  configs if you change the language settings after creating content types and views
  and whatever settings you'll have. I also would have needed to delete a lot of functionalities
  and settings (because it would be confusing to other people if the site had settings
  and content fields that weren't used on the site) and the risk of breaking something
  would have been greater. What I then chose was the second option to create a new
  site and then import configs from the original site.</p><h2>Copying the site's theme</h2><p>It's
  very easy to copy a theme onto a new site. I wanted to change the name of the theme
  to match the new site so I just replaced the old name with the new name. After that,
  the theme was ready to be modified to match the new site's requirements.</p><h2>Copying
  configuration from one site to another</h2><p>What you need to do in order to be
  able to copy config files from one site to another is to change the target Drupal
  site's system.site UUID to match the original site's UUID. There is a simple drush
  command to get this done: drush cedit system.site.</p><p>After changing the UUID,
  I was able to copy any config files I wanted from the original site. Some manual
  labour went into changing the langcode from fi to en for the config files. Blind
  find + replace wouldn't have worked because some config files had other language
  settings as well, not just the config language. I ended up modifying over 500 config
  files, but other than that, the process was really painless and everything went
  well. I've often modified config files with an editor instead of clicking through
  the Drupal UI before, so I was already comfortable modifying the config files by
  hand. By importing the configs manually I was able to leave unnecessary things out
  of the new site.</p><p>When importing blocks I needed to also change the theme names
  from the config files. This, fortunately, could easily be done with find + replace.
  If the blocks had the old theme name, the blocks wouldn't show on the new site with
  the new theme. I had also changed the names of a few content types which I also
  needed to change in the config files to match the new names. Drush, fortunately,
  gave me an error if I used a content type that didn't exist, so fixing the few missed
  name changes was easy.</p><p>I noticed that a couple of times my theme became unactivated
  which caused my block configuration page to stop working, it just gave a 404 error
  and nothing else. Luckily a coworker had experienced the same error behaviour after
  when a theme was inactive so I got the advice to check my theme settings. As soon
  as I re-activated the theme, all was back to normal. I suspect I might have missed
  the old theme name in some config files or something since this happened only twice
  and I did import configs multiple times just to make checking everything was always
  working when importing new configs a lot easier.</p><p>I don't necessarily recommend
  the manual importing process for all sites but I think it's nice to know that it's
  possible to do. And in this case, it saved me a lot of work.</p>"
photo_credits: ''
meta_description: Copying a Drupal site's configuration to another site. What it requires?

---
