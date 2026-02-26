# Migration Caveats

Things that weren't fully migrated, known differences, and items to verify before going live.

## Features Explicitly Skipped

- **Disqus comments** — Not ported. See `GUIDE.md` for setup instructions (Disqus, Giscus, or Utterances)
- **Google Analytics** — Not enabled. Placeholder in `hugo.toml`, instructions in `GUIDE.md`
- **PWA / Service Worker** — Not ported. Overkill for a static blog
- **Jest tests** — Not applicable (no JavaScript application layer in Hugo)
- **Debug post** — The `debug-showcase-gatsby-remark-copy-linked-files` post (dated 2030) was excluded
- **Inline code syntax highlighting** — The `±` marker feature from PrismJS is not supported in Hugo. Inline code renders as plain monospace with background color

## Known Visual Differences

### No Responsive/Optimized Images
Gatsby generated responsive image sets (multiple sizes, WebP, blur-up placeholders). Hugo serves original images. Impact: larger page sizes, no progressive loading. Can be added later with Hugo's `.Resize`/`.Fill` methods.

### No Heading Anchor Links
Gatsby used `gatsby-remark-autolink-headers` for clickable `#` links on headings. Hugo generates heading IDs but no visible anchor elements. Can be added with a custom `render-heading.html` hook.

### No Client-Side Navigation
Gatsby provided SPA-like page transitions. Hugo is a traditional multi-page site. Consider adding [instant.page](https://instant.page/) for link prefetching.

### Pagination URL Scheme Differs
- Gatsby: `/pages/2` (plural, no trailing slash)
- Hugo: `/page/2/` (singular, trailing slash)
- Old `/pages/N` URLs from Gatsby will 404. If these were bookmarked/linked, consider adding nginx redirects.

### Code Highlighting Subtle Differences
Both use solarized-light, but PrismJS (Gatsby) and Chroma (Hugo) may tokenize slightly differently. The Gatsby command-line prompt styling (`floriankempenich@localhost`) is not replicated.

### Tag Taxonomy Pages Exist
Hugo generates pages at `/tags/`, `/tags/learning/`, etc. These are functional but weren't in the Gatsby site. The tag pills on the index page remain non-clickable (matching Gatsby).

## Things to Verify Before Going Live

### Must Fix
1. ~~**`robots.txt`** — Was missing `enableRobotsTXT = true` in `hugo.toml`~~ Fixed
2. ~~**`og:image` meta tag** — SEO partial gated on `.Params.hero` (nonexistent). Fixed to use `.Resources.GetMatch`~~ Fixed
3. ~~**Broken image in tdd-my-hopes** — `tddCycle.jpg` referenced but file is `refactorCycle.jpg`~~ Fixed

### Should Verify
4. **Docker build** — Run `docker-compose -f docker-compose.hugo.yml up --build` and verify. The Dockerfile uses `apk add hugo` which may not install Hugo Extended (needed for SCSS). May need to download the binary instead.
5. **All old URL redirects** — Test `/post/1` through `/post/15`, `/post/01` through `/post/09`, and `/manifesto`
6. **Mobile layout** — Verify responsive breakpoints work on small screens
7. **HTML/CSS tag** — Contains a forward slash, creating `/tags/html/css/`. Verify this works
8. **Sitemap** — Includes tag taxonomy pages that Gatsby excluded. Consider adding exclusions

## Nice-to-Haves for Later

- **Image optimization** — Add Hugo image processing for responsive images and WebP
- **Heading anchor links** — Custom `render-heading.html` hook
- **Dart Sass migration** — `libsass` is deprecated; switch to `dartsass` when ready
- **Google Fonts self-hosting** — Eliminate third-party CDN request
- **Twitter meta tags** — Add `twitter:creator` with `@HelloThisIsFlo`
- **Hero image presentation on index** — The original Gatsby site had an animated shadow effect on hero images. Current Hugo version uses a simpler `scale(1.02)` hover
