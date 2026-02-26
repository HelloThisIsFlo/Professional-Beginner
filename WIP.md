# Work In Progress

Active tasks and discussion threads. Check this file first when resuming work.

## Active Discussion: Cloudflare Analytics

We want to add analytics. Flo already uses Cloudflare for DNS.

**Two options discussed:**
1. **Cloudflare Web Analytics (JS beacon)** — Richer data (page views, unique visitors, referrers, countries, devices). Requires adding a `<script>` tag with a beacon token from the Cloudflare dashboard (Web Analytics → Add site).
2. **Cloudflare built-in DNS analytics** — Already available if the domain is proxied (orange cloud). Server-side, no JS. More limited (request counts, bandwidth, status codes). Check: domain dashboard → Analytics & Logs → Traffic.

**Decision:** Not yet made. Flo needs to check what's already available in the Cloudflare dashboard before deciding. If Web Analytics is chosen, add the script to `baseof.html` before `</body>`:
```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

## Pending Cleanup

- **Delete stale dependabot branches on GitHub** — ~12 branches for the deleted frontend/ and RSS_feed/. Can be done via GitHub UI or `gh` CLI.

## Recently Completed

- Gatsby → Hugo migration (full site, 15 posts, custom theme)
- Legacy code removed (frontend/, RSS_feed/, git submodule)
- Dockerfile fixed (Hugo Extended on Debian, serves via nginx:alpine)
- GitHub Actions CI/CD → publishes to `ghcr.io/hellothisisflo/professional-beginner`
- Disqus comments re-enabled (same shortname `professionalbeginner`, same URLs = comment continuity)
- `twitter:creator` meta tag added (`@HelloThisIsFlo`)
- All references updated: Florian → Flo, X handle, CodePen URLs
- PNG images fixed in .gitignore (was ignoring all PNGs, now root-only)
- nginx `absolute_redirect off` (fixes port loss in redirects)

## User Preferences

- Prefers **Flo** (not Florian)
- Autonomous decisions, don't ask questions halfway
- Commit locally as you go
- Separate commits for separate concerns
