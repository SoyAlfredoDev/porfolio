This is a [Next.js](https://nextjs.org) multipage portfolio (ES/EN) with a performance-first animation system, mobile-first UX, and PWA install support.

## Animation system

See [`skills/animation-system/README.md`](skills/animation-system/README.md) and [usage examples](skills/animation-system/docs/usage-examples.md).

- Lenis smooth scroll (off with reduced-motion **and on mobile/touch**)
- Style switcher: `modern` / `retro` / `christmas` in Navbar
- Home: lazy atmosphere by style; heavy FX capped on mobile
- Portafolio / Contact: light primitives only

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3001/es](http://localhost:3001/es) (or the port Next prints). Prefer Chrome DevTools device mode at **390×844**.

## Mobile

- Safe-area insets for notch / home indicator (`viewport-fit=cover`)
- Touch targets ≥ 44px (nav, StyleSwitcher, lang, theme)
- Dense arcade/festive props hidden on small screens; snow/clouds stay light
- Contact form uses `inputMode` / `autoComplete` and 16px inputs (no iOS zoom)

## PWA — install as an app

Production only (service worker is **not** registered in `npm run dev`).

```bash
npm run build && npm start
```

Then open the site on your phone (same Wi‑Fi / deployed URL).

### Android (Chrome)

1. Open the site → menu **⋮**
2. **Install app** / **Add to Home screen**
3. Launch from the icon — opens `standalone` (no browser chrome)

### iPhone / iPad (Safari)

1. Open the site in **Safari** (not in-app browsers)
2. Share → **Add to Home Screen**
3. Open the icon — status bar uses `black-translucent`

### Verify PWA locally (desktop)

1. `npm run build && npm start`
2. Chrome → DevTools → **Application** → Manifest + Service Workers
3. Confirm `/manifest.webmanifest`, icons 192/512, SW `sw.js` activated

Icons live in [`public/icons/`](public/icons/) (placeholders — replace anytime; see that folder’s README).

Manifest: `app/manifest.ts` · SW: `public/sw.js` · Register: `components/pwa/RegisterSW.tsx`

## Deploy on Vercel

Deploy with the [Vercel Platform](https://vercel.com/new). After deploy, use the HTTPS URL to install the PWA on a real device.
