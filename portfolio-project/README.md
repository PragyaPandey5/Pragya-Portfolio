# Dev Portfolio

React + Tailwind CSS single-page portfolio. Dark, glassmorphic, bento-grid layout with an interactive terminal, a live chat demo, and a DSA stats chart.

## 1. Edit your content

Open `src/App.jsx` and edit the `PROFILE`, `EDUCATION`, `CERTS`, `SKILL_GROUPS`, `DSA_STATS`, `DSA_TOTALS`, and `PROJECTS` objects near the top of the file. That's the only place you need to touch for content changes.

## 2. Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Deploy to GitHub Pages

**Set your base path first.** In `vite.config.js`, set `base` to `/your-repo-name/` (matching your GitHub repo name exactly), or to `/` if this repo is your `username.github.io` user site.

**Option A — GitHub Actions (recommended, auto-deploys on every push):**

1. Push this project to a GitHub repo.
2. In the repo settings, go to Pages → Build and deployment → Source → select **GitHub Actions**.
3. Push to `main`. The included workflow at `.github/workflows/deploy.yml` builds and deploys automatically.

**Option B — manual deploy with `gh-pages`:**

```bash
npm install
npm run build
npm run deploy
```

This pushes the `dist/` folder to a `gh-pages` branch. Then in repo settings → Pages, set the source branch to `gh-pages`.

## Project structure

```
index.html
src/
  main.jsx        entry point
  App.jsx         the whole site (content + components)
  index.css       Tailwind + global styles
tailwind.config.js
vite.config.js
.github/workflows/deploy.yml
```

## Notes

- Colors, spacing, and effects use only standard Tailwind utility classes plus the three accent colors (purple / cyan / emerald) — safe to re-theme by find-and-replace.
- The DSA stats chart uses sample numbers — replace `DSA_STATS` and `DSA_TOTALS` with your real LeetCode/GfG data.
- All animation is CSS transitions + small React state machines (terminal typing, chat loop) — no 3D or animation libraries, so it stays light and fast on GitHub Pages.
- `prefers-reduced-motion` is respected globally in `index.css`.
