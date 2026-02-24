# How to Write a Blog Post

## Directory Structure

Each post lives in its own directory under `posts/`:

```
posts/
  my-new-post/
    index.md      # Post content (required)
    hero.jpg      # Hero image (optional, matches hero.*)
    other-img.png # Any other images referenced in the post
```

The directory name becomes the URL slug: `professionalbeginner.com/my-new-post/`

## Frontmatter

Every `index.md` starts with YAML frontmatter:

```yaml
---
title: "My Post Title"
tags: ["tag1", "tag2"]
date: "2025-07-15"
---
```

- **title** — displayed as the post heading and in metadata
- **tags** — array of tag strings; use `"featured"` to highlight a post
- **date** — `YYYY-MM-DD` format; controls publish date and sort order

## Excerpt Marker

Place `<!--end-->` in the post body to mark where the excerpt ends. Everything before this marker appears on the index page as the post summary.

```markdown
This is my intro paragraph that appears on the home page.<!--end-->

The rest of the post continues here...
```

## Images

- **Hero image:** Place a file named `hero.*` (jpg, png, etc.) in the post directory. Gatsby picks it up automatically.
- **Inline images:** Place them in the post directory and reference with relative paths:
  ```markdown
  ![alt text](./my-image.png)
  ```

## Scheduling Posts

Posts with a **future date** are automatically hidden from the site. Set the `date` field to a future date to schedule a post — it will appear automatically once that date arrives (no rebuild needed). The date filtering happens client-side at page load.

## Code Blocks

- Use standard markdown fenced code blocks with language identifiers
- For inline code with PrismJS highlighting, use `±` as the marker (configured in `gatsby-config.js`)
- Terminal prompts display as `floriankempenich@localhost`

## Deploy

1. Add your post directory under `posts/` and commit
2. Push changes to the posts repo (git submodule)
3. On the server, pull the latest submodule and rebuild:
   ```bash
   git submodule update --remote
   docker-compose up --build -d
   ```
   Frontend runs on port 2000, RSS feed on port 2001.
