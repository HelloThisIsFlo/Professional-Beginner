# Work In Progress

Active tasks and discussion threads. Check this file first when resuming work.

## Deploying

CI/CD pushes to `ghcr.io/hellothisisflo/professional-beginner` on push to `main`.

**On the server:**
```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## Next Up: Cloudflare Analytics

We want to add analytics. Flo already uses Cloudflare for DNS.

**Setup steps:**
1. Cloudflare dashboard → `professionalbeginner.com` → **Web Analytics** → **Add site**
2. Copy the beacon token
3. Add the script to `baseof.html` before `</body>`:
   ```html
   <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
   ```
4. (Or set the token in `hugo.toml` under `[params] cloudflareAnalytics` — placeholder already exists)

## Nice-to-Have: Image Optimization

Images load slowly — original files are served as-is (no resizing, no WebP). Gatsby used to generate responsive image sets automatically.

**What to do:** Use Hugo's built-in image processing (`.Resize`/`.Fill`) to generate multiple sizes and WebP variants. This would go in the image render hook (`layouts/_default/_markup/render-image.html`) and the hero image rendering in the post list/single templates.

See also: `hugo/MIGRATION_CAVEATS.md` → "No Responsive/Optimized Images"

## Recently Completed

- **Deployed Hugo to production** (professionalbeginner.com, Feb 26 2026)
- Gatsby → Hugo migration (full site, 15 posts, custom theme)
- Legacy code removed (frontend/, RSS_feed/, git submodule)
- Dockerfile fixed (Hugo Extended on Debian, serves via nginx:alpine)
- Dockerfile made multi-arch (amd64 + arm64 via `dpkg --print-architecture`)
- GitHub Actions CI/CD → publishes to `ghcr.io/hellothisisflo/professional-beginner`
- Disqus config migrated to `[services.disqus]` format (old `disqusShortname` was silently ignored by Hugo v0.142)
- Production docker-compose added (`docker-compose.prod.yml` — pulls pre-built image)
- The-gate updated: `/rss.xml` now proxies to Hugo's `/index.xml` on port 2000 (old RSS Express service on 2001 removed)
- Old Gatsby containers removed from server
- Stale Dependabot branches deleted (12 branches for removed frontend/ and RSS_feed/)
- Git remote updated to `HelloThisIsFlo/Professional-Beginner`
- `twitter:creator` meta tag added (`@HelloThisIsFlo`)
- All references updated: Florian → Flo, X handle, CodePen URLs
- PNG images fixed in .gitignore (was ignoring all PNGs, now root-only)
- nginx `absolute_redirect off` (fixes port loss in redirects)

## User Preferences

- Prefers **Flo** (not Florian)
- Autonomous decisions, don't ask questions halfway
- Commit locally as you go
- Separate commits for separate concerns
