---
category:
- Tech
type: blog-post
title: The selected interface language setting in Drupal
path: "/tech/the-selected-interface-language-setting-in-drupal"
post_date: 2019-10-24T00:00:00+03:00
main_image: "/uploads/letters-main.jpg"
listing_image: "/uploads/letters-thumb.jpg"
image_alt_text: Letters on a surface
body: "<p>A client of mine asked about locking the interface language on their multi-language
  site to English. By default, Drupal displays the UI based on the language version.
  Which sometimes means that if the site has several language versions, some users
  were forced to navigate the UI on languages they didn't know. This would make content
  updates a lot more difficult than what it needed to be. I know from experience that
  navigating the Drupal UI in a language you don't know a word in, is extremely difficult.</p><p>Instead
  of completely locking the UI to English, I decided to allow the users to select
  what language they wish to view the UI in. This way people with limited English
  skills could still view the UI in their native language (if their native language
  is one of the language versions). The setting has defaulted to English so if the
  users didn't feel the need to change the UI from English to another language; they
  didn't have to do anything.</p><p>We agreed that the content types and instructions
  were only created in English, which meant the users still would see some English
  no matter what language they selected from their user settings. In this case, everyone
  knows English, so they didn't desire to have the content types to be translated
  into other languages.</p><h2>A few issues with the selected interface language setting</h2><p>The
  functionality doesn't work properly if your site's default language isn't the same
  as the language without a prefix in the URL. The pages on the non-prefix language
  version would only give 404 errors. If the default language is the same as the language
  without the prefix, everything works as intended. Also, if all language versions
  have prefixes, the functionalities work properly no matter what your default language
  is.</p><p>If you have content that is translated via Drupal's t-function, the text
  will be displayed in the language the user has selected. This can confuse logged-in
  users so make sure you inform your users if you use this setting!</p><p>Drupal's
  default language selection drop-down block works by selecting the interface language.
  If the selected language interface is selected, the drop-down displays the language
  you have selected and doesn't work properly. What you can do is instruct your users
  to change the language version from the address bar or just don't use the default
  language selector block at all.</p>"
photo_credits: <p>Photo by <a href="https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  rel="noopener noreferrer" target="_blank">Jason Leung</a> on <a href="https://unsplash.com/s/photos/letters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  rel="noopener noreferrer" target="_blank">Unsplash</a></p>
meta_description: How the selected language drop-down works on multilingual Drupal
  sites and how different settings affect it.

---
