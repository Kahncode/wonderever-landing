# wonderever-landing — CLAUDE.md

Astro static landing page for **Wonderever** — a barrio (self-organized camp) at **Elsewhere**, a Burning Man–style regional event in the Monegros Desert, Spain (July, formerly called Nowhere). Members of Wonderever are called *Wonderlings*. Full context: [`wonderever.md`](./wonderever.md).

## Commands

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build → ./dist/
npm run preview   # preview built output locally
```

## Stack

| Layer       | Tool                          |
|-------------|-------------------------------|
| Framework   | Astro 6 (`output: 'static'`)  |
| UI islands  | React 18                      |
| Styling     | Tailwind CSS v4 (Vite plugin) |
| Deploy      | Cloudflare Pages              |
| Language    | TypeScript (strict)           |

### For Claude: Always Proactive

**When writing UI copy, CTAs, messaging, or onboarding:**
- Read `docs/shared/brand.md` FIRST — non-negotiable before proposing any copy
- Verify vocabulary and voice match brand.md examples
- Check color palette in brand.md — use only approved brand colors
- Never ship copy that hasn't been validated against brand guidelines

**When planning features or product decisions:**
- Check `docs/shared/product.md` for existing flow definitions and constraints
- Use issue templates and conventions from `docs/shared/planning.md`

**When updating shared docs:**
- This folder is synchronized across all repos via git subtree
- Before pushing changes upstream, verify they apply to all consuming projects

## Architecture

Islands Architecture: Astro renders all structure as static HTML. Interactive components are React `.tsx` files hydrated via `client:load` / `client:visible` directives. Default to static Astro components; reach for React only when state or interactivity is needed.

```
src/
  components/   # React .tsx (interactive islands) and .astro (static)
  layouts/      # Layout.astro — shared <head>, SEO, font, Tailwind import
  pages/        # File-based routing
  styles/       # global.css — @import "tailwindcss"
```

## Code Style

- TypeScript everywhere; no `any`
- Functional components only (React hooks)
- Tailwind-first: utility classes in markup, no separate CSS files except global.css
- No default exports from `.astro` files (Astro handles that); named exports okay from `.ts` helpers

### Image Management

**Never use raw `<img>` tags.** Always use Astro's `<Image>` component for automatic optimization (format to webp, lazy-loading).

**Image metadata (src and alt) lives in `src/assets/images.ts`**, exported as a centralized registry. This ensures alt text is consistent across all uses of the same image and properties are easy to audit.

**Always set `width` to constrain image output size.** Astro converts format but doesn't resize by default—set width to the max displayed size to avoid shipping oversized images. Height is calculated from aspect ratio.

**Aspect ratio and layout styles belong in the component**, not the registry—they're presentation concerns specific to usage context.

Pattern:
```typescript
// src/assets/images.ts
export const images = {
  coffeeDate: {
    src: importedImage,
    alt: "Women smiling while on a coffee date",
  },
};

// In components:
import { Image } from "astro:assets";
import { images } from "../assets/images";

<Image 
  src={images.coffeeDate.src} 
  alt={images.coffeeDate.alt}
  width={500}
  style="aspect-ratio: 1 / 1.2; object-fit: cover;"
/>
```

## Design Intent

- **Font**: Outfit (Google Fonts, weights 400/700) — per `docs/shared/brand.md`
- **Color Palette**: Use semantic tokens from `docs/shared/brand.md` color tables
  - Light theme: `#FFFFFF` background, `#000000` text, `oklch(0.62 0.26 322)` accent
  - Dark theme: `#141414` background, `#FFFFFF` text, `oklch(0.62 0.26 322)` accent (same accent)
- Apply brand.md tokens directly—no neutrals or placeholders

---

## Critical Rules

### 0. Never Publish Sensitive Data

- NEVER commit passwords, API keys, tokens, or secrets
- NEVER commit `.env` files — always verify `.env` is in `.gitignore`
- Before ANY commit: verify no secrets are staged

### 1. Ask Before Deploying

- NEVER commit directly to main, this triggers a deployment
- NEVER trigger a Cloudflare Pages deployment without explicit confirmation
- Always wait for: "yes, deploy this"

### 2. Quality Gates

- No file > 300 lines (split if larger)
- No function > 50 lines (extract helpers)
- All TypeScript must compile cleanly (`npm run build`) before committing

### 3. Never Work Directly on Main

```bash
git checkout -b feat/<task-name>
```

- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation
- `refactor/<name>` — refactors

---

## Project Structure

```
wonderever-landing/
├── CLAUDE.md
├── CLAUDE.local.md          (gitignored)
├── .claude/
│   ├── commands/            - Slash commands
│   ├── agents/              - Agent definitions
│   └── hooks/               - Pre/post-tool hooks
├── src/
│   ├── components/          - React .tsx islands and .astro static components
│   ├── layouts/             - Layout.astro (shared head, SEO, fonts)
│   ├── pages/               - File-based routing (.astro → HTML)
│   └── styles/              - global.css (@import "tailwindcss")
├── public/                  - Static assets served verbatim
├── dist/                    - Build output (gitignored)
├── astro.config.mjs         - Astro + Tailwind Vite plugin config
└── tsconfig.json            - TypeScript strict config
```

---

## Service Ports & Configuration

| Service    | Dev Port | Notes                          |
| ---------- | -------- | ------------------------------ |
| Astro dev  | 4321     | `npm run dev`                  |
| Preview    | 4321     | `npm run preview` (built dist) |

No environment variables required for local dev — this is a fully static site.

---

## When Something Seems Wrong

Before assuming something is broken:

- **Build error?** → Run `npm run build` and read the full error before changing code
- **Styles not applying?** → Check Tailwind v4 syntax — no `tailwind.config.js`, configured via CSS `@theme` or Vite plugin
- **Preact island not hydrating?** → Verify `client:load` / `client:visible` directive is present on the component
- **Astro component not updating?** → Restart dev server (`npm run dev`) — Astro HMR can miss `.astro` changes

---

## Notes for Claude

### Do

- Use the `documenter` agent to keep `docs/ARCHITECTURE.md` in sync with structural changes
- Default to `.astro` static components; only use Preact `.tsx` when interactivity is needed
- Use Tailwind utility classes in markup — avoid new CSS files
- Ask before refactoring more than 50 lines at once

### Don't

- Don't add a backend, API routes, or SSR without explicit agreement
- Don't auto-commit or auto-deploy
- Don't install new dependencies without discussing the tradeoff
- Don't add unnecessary dependencies — React is reserved for interactive islands only

---

## Design Context

> Full detail in `.impeccable.md`. This is the condensed version for quick reference.

### Users
Prospective Wonderlings and curious Nobodies at Elsewhere. One job: feel the vibe, decide they belong, apply. Single CTA: the application form. Secondary: contact email (`wondereverbarrio@gmail.com`).

### Brand Personality
**Neon · Grungy · Wonderstruck** — warm, self-aware, irreverent. "Totally not a cult." A hand-painted neon sign in a desert barrio that's been around long enough to feel like a legend.

### Aesthetic Direction
- **Theme**: Dark — deep desert night. Warm near-black backgrounds (`oklch(0.10 0.02 55)`).
- **Accent**: `oklch(0.62 0.26 322)` vivid purple (the neon heart). Secondary: dusty acid-green, burnt amber.
- **Typography**: `Monoton` (logo/wordmark, neon tube feel) · `Bungee` (headings) · `Jost` (body)
- **Effects**: `text-shadow` neon glow, CSS neon flicker on wordmark, grain/noise texture overlay, full-bleed atmospheric photography, asymmetric layouts, extreme scale contrast between display and body type.
- **Never**: gradient text, left-border accent stripes, card grids, glassmorphism soup, anything that looks like a startup landing page.

### Design Principles
1. Feel before function — first 3 seconds must create an emotional response (heat, dust, neon).
2. One CTA, unmissable — the apply button glows.
3. Texture over polish — grain, grit, intentional imperfection.
4. Scale as hierarchy — extreme type size contrast instead of boxes and cards.
5. Authentic weirdness — early-web personality, not retro nostalgia.