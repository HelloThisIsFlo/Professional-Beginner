# Hugo Migration Plan

## Goal

Migrate the Professional Beginner blog from Gatsby 5 to Hugo. This is a sandbox experiment — move fast, break things, don't push to remote. The user wants to see the final result and decide if they want to do a proper migration later.

## User Preferences

- **Styling is very important** — the Hugo site should look as close as possible to the current Gatsby site (live at professionalbeginner.com)
- **Don't ask questions** — work autonomously, make decisions (pick simpler/more modern option)
- **Commit locally as you go** — so changes are trackable
- **NEVER push to remote**
- **Use Playwright MCP** to take screenshots of the live site and compare with the Hugo build during development
- Git identity: "Claude" / "claude@anthropic.com"

## Current Architecture

### Repository Structure
```
Professional-Beginner/
├── frontend/           # Gatsby 5 blog (React 18, SCSS, Jest)
│   ├── blog/
│   │   ├── about.md           # About page content
│   │   ├── about-me.md        # Sidebar "About Me" bio
│   │   ├── bullet-points.md   # Sidebar bullet points
│   │   └── posts/             # Git submodule → GitLab
│   │       ├── a-new-beginning/index.md
│   │       ├── background-image-with-rounded-corners/index.md
│   │       ├── debug-showcase-gatsby-remark-copy-linked-files/index.md
│   │       ├── hexagonal-android-pt1-intro/index.md
│   │       ├── hexagonal-android-pt2-architecture/index.md
│   │       ├── hexagonal-android-pt3-boundaries/index.md
│   │       ├── my-first-fe-kata/index.md
│   │       ├── my-java-archetype/index.md
│   │       ├── my-learning-path/index.md
│   │       ├── open-articles/index.md
│   │       ├── socrates-2025/index.md
│   │       ├── static-vs-relative/index.md
│   │       ├── tdd-my-hopes/index.md
│   │       ├── the-dto-dilemma/index.md
│   │       ├── the-web-pt1/index.md
│   │       └── the-web-pt2/index.md
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout.jsx + layout.module.scss
│   │   │   ├── sidebar.jsx + sidebar.module.scss
│   │   │   ├── sidebar/about-me.jsx + about-me.module.scss
│   │   │   ├── sidebar/bullet-points.jsx + bullet-points.module.scss
│   │   │   ├── button.jsx + button.module.scss
│   │   │   ├── seo.jsx
│   │   │   └── header.jsx
│   │   ├── templates/
│   │   │   ├── post.jsx           # Individual blog post
│   │   │   └── oldPostsRedirect.jsx
│   │   ├── pages/
│   │   │   ├── pages.jsx + pages.module.scss  # Home/index with pagination
│   │   │   ├── about.jsx                       # About page
│   │   │   ├── 404.jsx
│   │   │   └── debug/  (skip)
│   │   ├── utils/
│   │   │   ├── paginator.js       # Pagination logic (6 posts/page, future-date filtering)
│   │   │   └── addExtraFormatting.js  # --- → em dash, ... → ellipsis
│   │   └── images/
│   │       ├── icon.png
│   │       └── profile_picture.jpeg
│   ├── static/
│   │   └── favicon.ico
│   ├── gatsby-config.js
│   ├── gatsby-node.js
│   └── package.json
├── RSS_feed/           # Express service: fetches JSON feed → generates RSS XML
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml  # frontend:2000, rss:2001
```

### Design / Visual Style

**Colors:**
- Background: `#fffcf5` (warm cream)
- Text: `#736f68` (tan/brown)
- Header background: `#a59e94` (light brown/grey), white text
- Links in posts: `#eb5e28` (orange) → darker on hover
- Post titles on index: `#68b3c8` (teal)
- Tag buttons: `#7a9e9f` (teal) → `#427c89` on hover
- Orange buttons: `#eb5e28` → `#b33c12` on hover
- Separator lines: `#F1EAE0`

**Typography:**
- Font: Montserrat (Google Fonts, light weights)
- Post h1: 3.5em (4.5em on large screens), centered, light weight
- Post h2: 2.5em (3em on large), light weight
- Body text: justified alignment

**Layout:**
- Max width: 1150px, centered
- Header: 80px tall, fixed on desktop
- Sidebar: 250px wide (right side on desktop, below content on mobile)
- Breakpoints: 450px (small), 900px (large)
- On large screens: header fixed, sidebar visible on right
- On small screens: header at top, sidebar below content

**Components:**
- Header: site title (linked to home) + "About" link
- Sidebar: "About Me" with profile picture (190x190, rounded) + bio + bullet points
- Post list: tags as teal pill buttons, post title, read time + date, hero image (250px tall with shadow + hover animation), excerpt
- Pagination: "Newer posts" / "Older posts" with arrow icons

**Code blocks:**
- Background: `#fdf6e3` (light yellow/solarized)
- PrismJS syntax highlighting
- Inline code marker: `±` (Gatsby-specific, needs custom handling)
- Command prompt styling with user/host

**Images:**
- 8px border-radius, box shadow on hero images and content images
- Hero images: colocated with posts as `hero.*`

### Blog Post Frontmatter Format
```yaml
---
title: "Post Title"
tags: ["tag1", "tag2"]
date: "YYYY-MM-DD"
---

Excerpt text here...

<!--end-->

Full post content...
```

### Special Features to Migrate
1. **Pagination** — 6 posts per page, future-dated posts hidden
2. **Excerpt** — `<!--end-->` separator (Hugo uses `<!--more-->`)
3. **Old URL redirects** — `/post/1` → `/about`, `/post/2` → `/my-learning-path`, etc. (use Hugo aliases)
4. **Hero images** — `hero.*` glob per post
5. **Extra formatting** — `---` → em dash, `...` → ellipsis
6. **Sidebar content** — about-me.md and bullet-points.md rendered as partials
7. **About page** — standalone page from about.md
8. **JSON feed** — for RSS service compatibility (or just use Hugo's built-in RSS)
9. **Sitemap** — Hugo generates this natively
10. **robots.txt** — disallow `/debug`

### URL Redirect Map (old → new)
```
/manifesto    → /about
/post/1       → /about
/post/2       → /my-learning-path
/post/3       → /tdd-my-hopes
/post/4       → /hexagonal-android-pt1-intro
/post/5       → /hexagonal-android-pt2-architecture
/post/6       → /hexagonal-android-pt3-boundaries
/post/7       → /open-articles
/post/8       → /the-dto-dilemma
/post/9       → /the-web-pt1
/post/01      → /about
/post/02      → /my-learning-path
... (same pattern with zero-padded numbers)
/post/10      → /the-web-pt2
/post/11      → /my-java-archetype
/post/12      → /a-new-beginning
/post/13      → /my-first-fe-kata
/post/14      → /background-image-with-rounded-corners
/post/15      → /static-vs-relative
```

## What to Skip
- **Disqus comments** — intentionally not porting
- **Google Analytics** — skip for now, but NOTE: Hugo supports GA easily via config or partial (add `googleAnalytics` to hugo.toml and use the built-in `google_analytics` internal template). Leave a note in config for future.
- **PWA manifest/offline** — overkill for a blog
- **Jest tests** — Gatsby-specific
- **Debug pages** — not needed

## Migration Steps

1. Install Hugo
2. Initialize Hugo site (reuse `frontend/` directory or create fresh)
3. Create custom theme `professional-beginner`
4. Port SCSS styling via Hugo Pipes (hugo has built-in SCSS support)
5. Create layouts: baseof, index (with pagination), single post, about page
6. Create partials: header, sidebar, about-me, bullet-points, seo
7. Set up content: symlink or copy blog posts, adapt frontmatter if needed
8. Handle `<!--end-->` → `<!--more-->` excerpt separator
9. Configure old URL redirects via Hugo aliases
10. Set up code highlighting (Hugo uses Chroma built-in)
11. Handle `±` inline code marker (custom render hook or shortcode)
12. Generate JSON feed or native RSS
13. Update Dockerfile and docker-compose.yml
14. Use Playwright MCP to screenshot live site and compare with Hugo output
15. Iterate on styling until visually matching
16. Commit everything

## Reference

- Live site: https://professionalbeginner.com
- Hugo docs: https://gohugo.io/documentation/
- Hugo SCSS: https://gohugo.io/hugo-pipes/transpile-sass-to-css/
- Hugo pagination: https://gohugo.io/templates/pagination/
