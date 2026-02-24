# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional Beginner (professionalbeginner.com) — a personal blog by Florian Kempenich. Monorepo with two services: a Gatsby static site frontend and a Node.js RSS feed service.

## Repository Structure

- `frontend/` — Gatsby 5 blog (React 18, SCSS, Jest)
- `RSS_feed/` — Express service generating RSS XML from the frontend's JSON feed
- `blog/` — Git submodule pointing to GitLab repo with blog post markdown files

## Commands

### Frontend (run from `frontend/`)

```bash
npm install               # Install dependencies
npm run develop           # Dev server on port 9000
npm run build             # Production build
npm run serve             # Serve production build
npm test                  # Run Jest tests
npm run tdd               # Jest in watch mode
npm run format            # Prettier formatting
```

### Docker (run from root)

```bash
docker-compose up --build   # Both services: frontend on :2000, RSS on :2001
```

### Git Submodule

Blog content lives in a separate GitLab repo as a submodule at `frontend/blog/posts`. After cloning, run `git submodule update --init --recursive`.

## Architecture

**Data flow:** Markdown posts (git submodule) → Gatsby processes via `gatsby-transformer-remark` → static HTML + `allPosts.json` → RSS service fetches JSON and generates XML feed.

**Page generation** (`frontend/gatsby-node.js`):
- Blog posts created from markdown files matching `**/blog/posts/**/index.md`
- Slugs derived from filesystem path via `gatsby-source-filesystem`
- Index page at `/` uses `src/pages/pages.jsx`
- Old `/post/N` URLs redirected to new slugs via `src/templates/oldPostsRedirect.jsx`

**Pagination** (`frontend/src/utils/paginator.js`):
- `Paginator` class filters posts by publish date (future-dated posts hidden)
- 6 posts per page (configured in `gatsby-config.js` → `siteMetadata.config.postsPerPage`)
- `PostWithDate` pairs a post node with its date for filtering

**Styling:** SCSS with CSS Modules. Shared variables in `src/variables.module.scss` (colors, breakpoints, sidebar width).

## Content Conventions

- Blog posts use markdown with frontmatter (title, date, tags)
- Excerpt separator: `<!--end-->`
- Hero images colocated with posts (matched via `posts${slug}/hero.*` glob)
- Inline code marker for PrismJS: `±` (configured in `gatsby-config.js`)

## Testing

- Jest with `jsdom`, configured in `frontend/jest.config.js`
- Babel preprocessing via `jest-preprocess.js` (uses `babel-preset-gatsby`)
- Mocks: `__mocks__/file-mock.js` for static assets, `__mocks__/gatsby.js` for Gatsby APIs
- SCSS modules mapped to `identity-obj-proxy`
- Tests colocated with source (e.g., `paginator.test.js` next to `paginator.js`)

## Key Config

- `gatsby-config.js` — all plugins, site metadata, feed generation query
- `gatsby-node.js` — page creation, slug generation, old-post redirects
- PrismJS prompt configured as `floriankempenich@localhost`
- Disqus shortname: `professionalbeginner`
