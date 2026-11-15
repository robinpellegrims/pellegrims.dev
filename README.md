# Pellegrims.dev

Personal website

https://www.pellegrims.dev

## Publishing Markdown

- Add blog posts to `content/blog` and snippets to `content/snippets`.
- Follow an existing file's YAML front matter. Blog posts commonly include `title`, `description`, `date`, `updateDate`, `tags`, and `coverImage`.
- Store blog images in `public/assets/blog/<slug>/` and reference them as `/assets/blog/<slug>/<filename>`.

Every `.md` file in `content/blog` and `content/snippets` is included in the generated site when deployed. There is no draft filter, so `published: false` does not hide a file. Keep drafts outside these folders until they are ready to publish.
