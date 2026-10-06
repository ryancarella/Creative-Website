# Frost

Exact supplied Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion template.
Target: https://github.com/ryancarella/Creative-Website.git
Pages: https://ryancarella.github.io/Creative-Website/
Base: /Creative-Website/

Validated: production build, ESLint, production browser preview, video decode,
Inter 200/800 fonts, and deployment asset paths.

Template behavior is preserved: the form does not store or submit emails,
navigation anchors do not have corresponding sections, and narrow navigation
can overlap. These behaviors are present in the supplied source.

## Publish from this working folder in your own terminal

The project is configured for main and the origin repository above. To publish
from a fresh checkout, configure origin if needed and run:

    git remote add origin https://github.com/ryancarella/Creative-Website.git
    git add .github .gitignore eslint.config.js index.html package.json pnpm-lock.yaml public src tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts README.md
    git commit -m "Build Frost landing page and configure GitHub Pages"
    git push -u origin main

If Git requests author identity, configure your own name and email, then repeat
the commit. Complete GitHub authentication if prompted.

In GitHub Settings > Pages > Build and deployment > Source choose GitHub Actions.
Then Actions > Deploy Frost to GitHub Pages > Run workflow > main.

Node 24 and pnpm 11.19.0 are used in CI. For local validation:

    pnpm install --frozen-lockfile
    pnpm lint
    pnpm build
    pnpm preview

