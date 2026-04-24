# Wonderever Landing Page

Landing page for **Wonderever**, a barrio (self-organized camp) at **Elsewhere** — a Burning Man–style regional event held every July in the Monegros Desert, Spain (formerly called Nowhere). Wonderever has been active since 2013; its members are called *Wonderlings*.

- **Event:** Elsewhere / Nobodies Collective — https://nobodies.team/
- **Barrio:** Wonderever — https://www.wonderever.space/
- **Barrio profile:** https://humans.nobodies.team/Barrios/wonderever
- **Barrio contact email:**: wondereverbarrio@gmail.com
- **Barrio application form (2026):** https://docs.google.com/forms/d/e/1FAIpQLSf47eikyRyJv_UiQxbgP4WL_ujqcO7Git-9PqrA-ziu2_j6Lw/viewform
- **Context dump:** [`wonderever.md`](./wonderever.md)

---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
## Stack

- **Astro 6** — static output, file-based routing, Islands Architecture
- **React 18** — interactive islands via `client:load` / `client:visible`
- **Tailwind CSS v4** — configured as a Vite plugin, CSS-first (`@import "tailwindcss"`)
- **Cloudflare Pages** — static hosting with edge delivery

## Deploy

Push to `main` → Cloudflare Pages builds automatically with `npm run build` and serves `./dist/`.

> See `CLAUDE.md` for architecture decisions, code style, and contributor rules.
