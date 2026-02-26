# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional Beginner (professionalbeginner.com) — a personal blog by Flo Kempenich, built with Hugo.

## Repository Structure

- `hugo/` — Hugo static site with custom `professional-beginner` theme
  - `content/posts/` — 15 blog posts as page bundles (index.md + images)
  - `content/page/about.md` — About page
  - `themes/professional-beginner/` — Custom theme (layouts, SCSS, static assets)
  - `hugo.toml` — Site configuration
  - `Dockerfile` + `nginx.conf` — Multi-stage Docker build (Hugo → nginx)
- `docker-compose.yml` — Docker Compose (frontend on port 2000)

## Commands

### Development

```bash
hugo server --source hugo                          # Dev server (localhost:1313)
hugo server --bind 0.0.0.0 --source hugo           # Dev server (accessible on network)
hugo --source hugo --minify                         # Production build to hugo/public/
```

### Docker (run from root)

```bash
docker-compose up --build   # Build and serve on port 2000
```

## Architecture

**Data flow:** Markdown posts (page bundles in `content/posts/`) → Hugo builds static HTML → nginx serves.

**Key config** (`hugo/hugo.toml`):
- Pagination: 6 posts per page
- Permalinks: `/:filename` (clean URLs matching old Gatsby site)
- Markup: Goldmark with typographer, Chroma syntax highlighting (solarized-light)
- Old URLs: `aliases` in post frontmatter redirect `/post/N` to current slugs

**Theme** (`hugo/themes/professional-beginner/`):
- `layouts/` — baseof, list (with pagination), posts/single, page/single, 404
- `layouts/partials/` — header, sidebar, about-me, bullet-points, seo, ordinal-date
- `layouts/_default/_markup/render-image.html` — Custom image render hook (figure + figcaption)
- `assets/scss/` — main.scss, variables.scss, _chroma.scss (Chroma syntax highlighting)
- `static/images/` — Profile picture, favicon, icon

**Built-in features (no custom code):** Pagination, future-date filtering, RSS (`/index.xml`), sitemap, robots.txt

## Content Conventions

- Blog posts are page bundles: `content/posts/<slug>/index.md` with colocated images
- Frontmatter: title, date, tags, aliases (for old URL redirects)
- Excerpt separator: `<!--more-->`
- Hero images: named `hero.*` in the page bundle directory

## CI/CD

- GitHub Actions builds and pushes to `ghcr.io/hellothisisflo/professional-beginner` on push to `main`
- Image tagged with `latest` and git SHA (e.g., `sha-abc1234`)
- See `.github/workflows/publish.yml`

## Current Work

**Read `WIP.md` first** — contains active discussions, pending tasks, and recent context.

## Migration History

This site was migrated from Gatsby 5 in Feb 2026. See:
- `hugo/MIGRATION_LOG.md` — Full record of changes
- `hugo/MIGRATION_CAVEATS.md` — Known gaps, nice-to-haves, and things to verify
- `hugo/GUIDE.md` — How to add analytics, comments, write posts
- Tag `last-gatsby-version` marks the final Gatsby commit for reference

## User Preferences

- Prefers **Flo** (not Florian)
- Make decisions autonomously, don't ask questions halfway
- Commit locally as you go, separate commits for separate concerns
- **Never push to remote without explicit approval** — always ask before `git push`
