# Gatsby to Hugo Migration Log

## Overview

Migration of **Professional Beginner** (professionalbeginner.com) from Gatsby 5 (React 18, Node.js) to Hugo, performed on 2026-02-26. The goal was to faithfully reproduce the Gatsby site's visual appearance and functionality with dramatically less complexity.

## Commit History

| # | Commit | Description |
|---|--------|-------------|
| 1 | `98572e0` | Initial big-bang: Hugo config, custom theme, all templates, full SCSS port, 15 blog posts, JSON feed, about page, sidebar, redirects, static assets |
| 2 | `0ee533f` | Add .gitignore, remove accidentally committed `hugo/public/` |
| 3 | `2d9712b` | Docker setup (multi-stage Alpine + nginx) and `±` inline code marker fix |
| 4 | `25e27c1` | Fix hero image shadow, double ellipsis, and Chroma syntax highlighting |
| 5 | `16aa4f3` | Fix markdown headings (78 across 7 posts), pagination SVG arrows, image width |
| 6 | `dd09d62` | Font-weight tweaks for pills and excerpts |
| 7 | `0479469` | Bump pill font-weight to 300, add GUIDE.md |

## Feature Migration Map

### Pagination
- **Gatsby:** Custom `Paginator` class (43 lines JS + tests), manual future-date filtering
- **Hugo:** One-line `.Paginate` call. Future-date filtering is built-in (`buildFuture = false`)

### Excerpts
- **Gatsby:** `<!--end-->` separator, CSS `::after` for trailing `. . .`
- **Hugo:** `<!--more-->` separator, template logic strips Hugo's auto-ellipsis then applies `truncate 200 " . . ."`

### URL Redirects
- **Gatsby:** 25 explicit `createPage()` calls in `gatsby-node.js` with a React redirect template
- **Hugo:** `aliases:` array in each post's YAML frontmatter

### Permalinks
- **Gatsby:** `createFilePath` from `gatsby-source-filesystem`
- **Hugo:** `[permalinks] posts = "/:filename"` — identical URLs

### Syntax Highlighting
- **Gatsby:** PrismJS plugin with solarized-light CSS
- **Hugo:** Chroma built-in, `noClasses = false`, custom `_chroma.scss` generated via `hugo gen chromastyles --style=solarized-light`

### RSS Feed
- **Gatsby:** Required separate `RSS_feed/` Express service fetching `allPosts.json`
- **Hugo:** Native RSS at `/index.xml` — no external service needed

### Images
- **Gatsby:** `gatsby-plugin-sharp` (responsive sizes, WebP, blur-up placeholders)
- **Hugo:** Serves original images. Custom render hook wraps in `<figure>/<figcaption>`

### Typography
- **Gatsby:** Custom `addExtraFormatting.js` for em dashes and ellipsis
- **Hugo:** Goldmark typographer extension (`typographer = true`)

### SEO
- **Gatsby:** React Helmet component
- **Hugo:** `seo.html` partial with title, description, OG, Twitter Card, canonical, RSS link

### Sitemap
- **Gatsby:** `gatsby-plugin-sitemap`
- **Hugo:** Built-in sitemap generation

## Key Technical Decisions

1. **libsass over dart-sass** — Bundled with Hugo Extended, no additional binary needed
2. **Chroma CSS classes** — `noClasses = false` with generated `_chroma.scss` for clean HTML
3. **Page bundles** — Posts copied into `hugo/content/posts/` (not symlinked to submodule) for direct image access
4. **Simplified hero hover** — Replaced external Tumblr shadow PNG with CSS `transform: scale(1.02)`
5. **Custom ordinal date partial** — Hugo lacks built-in ordinal suffixes ("1st", "2nd", "3rd")
6. **Multi-stage Docker** — Alpine + Hugo build, then nginx:alpine for serving (~25MB vs ~900MB)

## SCSS Consolidation

Gatsby used CSS Modules across ~8 files. Hugo consolidates into:
- `main.scss` (546 lines) — all styles
- `variables.scss` (16 lines) — SCSS variables
- `_chroma.scss` (88 lines) — syntax highlighting

## Content Migration

15 of 16 posts migrated (debug post excluded). Each post required:
1. Copy directory (markdown + images) as page bundle
2. Replace `<!--end-->` with `<!--more-->`
3. Add `aliases:` for old `/post/N` URLs
4. Strip `±` inline code markers where present
5. Fix headings missing space after `#` (78 fixes across 7 posts)

## Docker Comparison

| Aspect | Gatsby | Hugo |
|--------|--------|------|
| Base image | `node:18.12.1` (~900MB) | `alpine:3.19` + `nginx:alpine` (~25MB) |
| Runtime | Node.js (gatsby serve) | nginx (static files) |
| Build time | Minutes (npm install + gatsby build) | Seconds (hugo --minify) |
| Dependencies | ~30 npm packages | Zero |

## Progression of Fixes

1. **Initial build** — Complete site with known visual gaps
2. **Cleanup** — .gitignore, remove committed build artifacts
3. **Docker** — Production deployment stack, inline code marker fix
4. **Visual bugs** — Hero shadow, double ellipsis, syntax highlighting CSS
5. **Content/layout** — Markdown headings, SVG pagination arrows, image width
6. **Typography** — Font-weight fine-tuning for pills and excerpts
7. **Documentation** — GUIDE.md with analytics, comments, and operational docs
