# Hugo Site Guide

## Adding Google Analytics

1. Get your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)

2. Add it to `hugo.toml`:
   ```toml
   [params]
     googleAnalytics = "G-XXXXXXXXXX"
   ```

3. Add the template to the `<head>` section in `themes/professional-beginner/layouts/_default/baseof.html`:
   ```html
   {{ if .Site.Params.googleAnalytics }}
   {{ template "_internal/google_analytics.html" . }}
   {{ end }}
   ```

   Hugo's built-in template handles the full gtag.js snippet. It will only render when the param is set, so dev environments stay clean.

## Adding Comments (Disqus or Alternatives)

### Option A: Disqus

1. Add your shortname to `hugo.toml`:
   ```toml
   [services]
     [services.disqus]
       shortname = "professionalbeginner"
   ```

2. Add the template to `themes/professional-beginner/layouts/posts/single.html`, after `{{ .Content }}`:
   ```html
   {{ template "_internal/disqus.html" . }}
   ```

### Option B: Giscus (GitHub Discussions - no tracking, free)

1. Set up Giscus at https://giscus.app/ — connect it to your GitHub repo

2. Add the script to `themes/professional-beginner/layouts/posts/single.html`, after `{{ .Content }}`:
   ```html
   <script src="https://giscus.app/client.js"
     data-repo="your-org/your-repo"
     data-repo-id="YOUR_REPO_ID"
     data-category="Comments"
     data-category-id="YOUR_CATEGORY_ID"
     data-mapping="pathname"
     data-theme="light"
     crossorigin="anonymous"
     async>
   </script>
   ```

### Option C: Utterances (GitHub Issues - lightweight)

Similar to Giscus but uses GitHub Issues instead of Discussions. Set up at https://utteranc.es/

## Future-Dated Posts

Hugo **automatically hides future-dated posts** in production builds. This is the default behavior (`buildFuture = false`). If a post's `date` in frontmatter is set to a future date, it won't appear until that date.

During development with `hugo server`, future posts are also hidden by default. To preview them locally:
```bash
hugo server --buildFuture
```

## Old URL Redirects

All old `/post/N` URLs are redirected via Hugo aliases in each post's frontmatter. For example:
```yaml
aliases:
  - /post/2
  - /post/02
```

Hugo generates small HTML redirect pages with `<meta http-equiv="refresh">` and `rel="canonical"` links.

## Writing a New Post

1. Create a new page bundle:
   ```bash
   mkdir hugo/content/posts/my-new-post
   ```

2. Create `index.md` with frontmatter:
   ```markdown
   ---
   title: "My New Post"
   date: 2026-03-01
   tags: ["topic1", "topic2"]
   ---

   Post content here.

   <!--more-->

   Content after the excerpt marker.
   ```

3. Add a hero image as `hero.jpg` (or `hero.png`) in the same directory. It will be automatically picked up for the post list.

4. Images used within the post should also be placed in the same directory and referenced as:
   ```markdown
   ![Alt text / caption](my-image.png)
   ```

## Development

```bash
# Start dev server (accessible on local network)
hugo server --bind 0.0.0.0 --source hugo

# Build for production
cd hugo && hugo --minify

# Build and serve with Docker
docker-compose -f docker-compose.hugo.yml up --build
```

## RSS Feed

The RSS service (`RSS_feed/`) fetches `allPosts.json` from the Hugo frontend and generates an XML feed. The JSON output is configured in `hugo.toml` under `[outputs]` and the template is at `themes/professional-beginner/layouts/_default/index.json`.
