# Work In Progress

Active tasks and discussion threads. Check this file first when resuming work.

## Next Up: Deploy to Production

The site is ready to deploy. CI/CD pushes to `ghcr.io/hellothisisflo/professional-beginner` on push to `main`.

**On the server**, pull and run:
```bash
git pull
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

This serves the blog on port 2000 (same as before). The old Gatsby setup used `docker-compose up --build -d` — the new setup uses a pre-built image so no build step needed.

**After deploying:** Verify Disqus comments load on a real post (they're blocked on localhost by design).

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

## Recently Completed

- Gatsby → Hugo migration (full site, 15 posts, custom theme)
- Legacy code removed (frontend/, RSS_feed/, git submodule)
- Dockerfile fixed (Hugo Extended on Debian, serves via nginx:alpine)
- Dockerfile made multi-arch (amd64 + arm64 via `dpkg --print-architecture`)
- GitHub Actions CI/CD → publishes to `ghcr.io/hellothisisflo/professional-beginner`
- Disqus config migrated to `[services.disqus]` format (old `disqusShortname` was silently ignored by Hugo v0.142)
- Production docker-compose added (`docker-compose.prod.yml` — pulls pre-built image)
- `twitter:creator` meta tag added (`@HelloThisIsFlo`)
- All references updated: Florian → Flo, X handle, CodePen URLs
- PNG images fixed in .gitignore (was ignoring all PNGs, now root-only)
- Stale Dependabot branches deleted (12 branches for removed frontend/ and RSS_feed/)
- Git remote updated to `HelloThisIsFlo/Professional-Beginner`
- nginx `absolute_redirect off` (fixes port loss in redirects)

## User Preferences

- Prefers **Flo** (not Florian)
- Autonomous decisions, don't ask questions halfway
- Commit locally as you go
- Separate commits for separate concerns
