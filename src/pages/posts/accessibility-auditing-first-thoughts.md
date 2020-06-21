---
category:
- Tech
type: blog-post
title: Accessibility auditing - first thoughts
path: "/tech/accessibility-auditing-first-thoughts"
post_date: 2020-06-07T00:00:00+03:00
main_image: "/uploads/cookie-the-pom-using-ipad-main.jpg"
listing_image: "/uploads/cookie-the-pom-using-ipad-thumb.jpg"
image_alt_text: Cookie the pomeranian using an ipad
body: <p>I was able to officially take part in a few accessibility audits at work.
  The auditing is even more interesting and fun than I first anticipated. I was really
  happy to get to be a part of the accessibility process. My role was to mostly focus
  on the more technical aspects, for example, the validity and quality of the HTML.
  My teammates tackled the sections for the content and various devices. It's clearly
  a huge benefit to have people with different job descriptions to do the testing.
  People have different expertise areas and in our case, it was really helpful to
  have our unique skillsets combined.</p><h2>Keyboard navigation</h2><p>I've been
  testing small parts of a website and smaller, more accessible, websites in general
  with just a keyboard before this. It honestly didn't properly prepare me for the
  horror that some websites could be.</p><p>After starting to test larger sites, it
  didn't take long to notice how painful it can be to try to navigate sites that haven't
  paid attention to accessibility. Some, even quite important, parts of the site could
  be completely inaccessible with just a keyboard. This has woken me up to some things
  I haven't been doing well enough in the past, I can't wait to fix these issues and
  see how much they improve the site's accessibility.</p><h2>Screen readers</h2><p>Because
  we use MacBooks at work, the logical choice for a screen reader was Apple VoiceOver.
  Oh my, I must admit I was so lost at first. It might have been a good idea to first
  just try to learn all the settings and commands instead of hopping right into the
  practical testing but this way I ended up having more fun trying to learn how to
  navigate and use the program by myself. After spending some time practicing the
  commands and the general idea of the program, I was able to properly start testing
  websites with it.</p><p>It was really interesting to really see how an image's alt
  text appears in the screen reader in reality. Having good alt texts is really important,
  to get this point across to content creators, it might be a good idea for them to
  try out screen readers themselves. And I also noticed quite quickly that if an image
  doesn't really have a meaning other than visual decorativeness, it would be better
  to be ignored by the screen readers completely. I really don't need the name of
  the person in the image, when the image is, for example, used as a decorative image
  for a blog highlight.</p><p>It was also quite interesting to see that an element
  that wouldn't properly work with just a keyboard, could still function just fine
  with the screen reader.</p><p>I was also able to find a form on the web (one of
  many most likely, unfortunately) that had a lot of form fields but they had no labels
  or any other names attached to them. The text that would normally be placed as a
  label, was placed outside of the form structure as regular text. The screen reader
  had no idea what to do in each of the fields. It didn't help that the same was done
  to the few input instructions that were provided. The form only worked if you could
  see, and even then the functionality wasn't all that great. This was in its horribleness
  a really good test case because I could clearly see how bad things can be and I'm
  sure I will pay even more attention to the forms I create from now on.</p><p>I also
  briefly tried out Windows Narrator and Android TalkBack. Both seemed quite nice
  to use, though for my test run with Narrator I used my mouse together with the keyboard.
  With VoiceOver I had mostly attempted to not use the mouse to properly see what
  would happen with each element.</p><h2>What I took from the testing</h2><p>I noticed
  that quite often custom functionalities, mostly based on someone's handwritten custom
  code, forget to include keyboard functionalities.</p><p>For some reason, field labels
  are often removed and the field placeholder is used instead. This is not a very
  good practice and I personally don't understand it. I've heard excuses that the
  field looks better without the label because "basic fields" look boring. It's hardly
  a good enough reason to lessen the site's accessibility. Field labels make form
  fields clearer for every user, so they should be used whenever possible. And if
  there is a case the labels cannot be used, the WCAG requirements should be met in
  other ways, no matter if you're bound by the requirements or not.</p><p>Sometimes
  the focus default styles are removed because they aren't pretty enough to someone's
  eyes. In these cases, I hope people would realize that designing prettier focus
  styles is the answer. Just deleting the styles is a horrible idea because it gets
  very hard to know which element you have navigated to. I've seen some custom focus
  styles that have been accessible, nice looking, and fit perfectly to the website's
  style. Designing these styles doesn't really even necessarily take that much effort.
  Just check that the focus has enough contrast on each possible site background and
  make sure the style is understandable by the users.</p><p>If project schedules are
  very tight, or too tight, the first sufferer is often testing. Testing should be
  a higher priority than it often is. All functionalities should always be properly
  tested because we are only human after all and sometimes we make mistakes or forget
  something. It's sad if a site's usability suffers because of some simple mistake
  that could have easily been fixed if only it was noticed.</p><p>It also became even
  clearer how necessary it is to think about accessibility in the planning and design
  processes. If the issue is addressed only in the development phase by the site developers,
  it's too late. It is in all of our best interests to make sure the web is inclusive
  and usable by everyone, no matter what tools they use.</p>
photo_credits: <p>Photo by <a href="https://unsplash.com/@cookiethepom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  rel="noopener noreferrer" target="_blank">Cookie the Pom</a> on <a href="https://unsplash.com/@cookiethepom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  rel="noopener noreferrer" target="_blank">Unsplash</a></p>
meta_description: My first thoughts after taking part in accessibility testing.

---
