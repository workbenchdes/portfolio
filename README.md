# RENANDO — Cinematic Portfolio (customized)

The hero section is preserved through **SCROLL TO DISCOVER**. Below it, the portfolio now has three sections in order:

1. **WORKS** — project gallery
2. **ABOUT** — introduction, education, skills, creative process
3. **CONTACT** — email, Instagram, phone/WhatsApp, and project inquiry form

The header navigation and mobile menu now link only to Works, About, and Contact. Awards, the standalone breakdown section, and the separate journey section are no longer displayed.

## Run locally

```sh
npm install
npm run check
npm run build
npm start
```

Then open `http://localhost:4173`.

## Asset note

The uploaded source included empty `projects.json` and `brands.json` files and did not include the original binary assets. As a result, the hero portrait, project gallery data, logos, certificates, and CV will need to be restored before the site is publication-ready. See `MISSING_ASSETS.md` and run `node scripts/fetch-assets.mjs` if the original host becomes reachable.
