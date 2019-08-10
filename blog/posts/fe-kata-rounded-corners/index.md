---
title: "Background Image With Rounded Corners"
tags: ["html/css", "web", "learning"]
date: "2019-07-03"
---

Recently I have been dedicating some time to the study of the fundamentals of HTML and CSS. A couple of days ago I wrote a blog post on [my very first Front-End Kata](/my-first-front-end-kata)<!--end-->. The result is this Slack-like card:

![Finished Slack Card](finished_slack_card.jpg)

_The link to the CodePen: [Slack Card](https://codepen.io/FlorianKempenich/pen/xoYbrp)_

I decided to write a couple of follow up articles to share a few things I learned through this experience. It isn't mean to teach the basics of CSS, just meant to share 2 or 3 interesting piece of info I remembered the most 🙂. Today is the first one of the series

### Background Image With Rounded Corners

The HTML code for the Slack card looks like this:

```html{numberLines: true}
<div class="slack-card">
  <div class="header-with-img">
    ...Picture and Name...
  </div>
  <div class="time-and-date">
    ...
  </div>
  <ul class="profile-actions">
    ...
  </ul>
</div>
```

```html{1, 3-4}
<div class="slack-card">
  <div class="header-with-img">
    ...Picture and Name...
  </div>
  <div class="time-and-date">
    ...
  </div>
  <ul class="profile-actions">
    ...
  </ul> // highlight-line
</div>
```

```html
<div class="slack-card">
  <div class="header-with-img">
    ...Picture and Name...
  </div>
  <div class="time-and-date">
    ...
  </div>
  <ul class="profile-actions">
    ...
  </ul> // highlight-line
</div>
```

```bash{numberLines: 123}
...
these lines are
starting not at 1 //highlight-line
...
```

Now some sample bash code

```bash{promptHost: machine}{promptUser: me}
IMG=memory-game
CONTAINER=memory-game-container

PORT=7000

yarn build
docker build -t ${IMG} .
docker stop ${CONTAINER}
docker rm ${CONTAINER}
docker run \
    --name ${CONTAINER} \
    --restart=always \
    -p ${PORT}:80 \
    -d \
    ${IMG}
```

```javascript{1-2,22}{numberLines: 1}
// In your gatsby-config.js
```

The Profile Picture is a `background-image` set in `.header-with-img`, but the rounded corders were set on the parent `.slack-card` with `border-radius`. What would happen is that while the `.slack-card` would be rounded as expected, it wouldn't clip the background image of `.header-with-img` and the image would be visible outside the boundaries of `.slack-card`.

PICTURE:addpictureofpictureoverflowing.123.123."asdfads"

What's the fix? Well, another way of describing the problem would be to say the `.header-with-img` was **overflowing** from the `.slack-card` container. The fix to allow clipping was simply to add `overflow: hidden` to `.slack-card`:

```css{highlightLines: 1-2}
.slack-card {
  ...
  overflow: hidden;
  ...;
}
```

I could see at least 2 other possibilities for solving this problem:

#### The following classes are highlighted as CSS **even though they're inline code blocks**
- `css±.some-class { background-color: red }`

- Setting the same `css±border-radius:` on the `css±.header-with-img{}`
- Removing `border-radius` from `.slack-card` altogether, and dealing with the corner rounding in `.header-with-img` for 2 top corners and `profile-actions` for the 2 bottom ones.

That being said, I wasn't a fan of the first alternative because of the redundancy it induces, and I wasn't a fan of the second one because I wasn't sure how shadow would behave.

Either way, if you have arguments for one or the other of the alternative solutions, or maybe even a third idea, be sure to let me know in the comments or [@ThisIsFlorianK](https://twitter.com/home?status=%40ThisIsFlorianK) on Twitter ;)

_Until next time --- The Professional Beginner_
