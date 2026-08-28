# Codeforge

Educational recreation of [notion.com](https://www.notion.com/) for the team repository [varunigabv2025/Codeforge](https://github.com/varunigabv2025/Codeforge).

This is **not** an official Notion product. Brand names and copy are used only for a frontend cloning assignment.

## Current progress

| Page | Owner | Status |
|------|-------|--------|
| Landing page (`index.html`) | Contributor (this PR/commit) | Done |
| Other website pages | Team | Placeholders in `pages/` |

## Run locally

Open the landing page in a browser:

```bash
# from the repo root
start index.html
```

Or serve with any static server:

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Project structure

```
index.html              # Notion-style landing page
assets/css/styles.css   # Landing page styles
assets/js/main.js       # Hero word rotation, nav, marquees
pages/                  # Additional pages for teammates
```

## Contributing

1. Clone `https://github.com/varunigabv2025/Codeforge.git`
2. Create or update your page under `pages/` (or root for shared shell)
3. Reuse `assets/css/styles.css` where possible
4. Commit and push (or open a pull request)
