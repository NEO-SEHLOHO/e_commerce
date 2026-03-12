# Deployment Guide

This website is a static site (HTML/CSS/JS), so no server runtime is required.

## Pre-deploy checklist

1. Open `index.html`, `shop.html`, `about.html`, `contact.html`, `quote.html`, `legal.html` locally.
2. Confirm image paths load from `assets/images/...`.
3. Confirm quotation links work:
   - WhatsApp: `https://wa.me/27607711685`
   - Phone: `060 771 1685`, `084 246 4470`
   - Email: `bntinnocons@gmail.com`

## Option 1: Netlify (recommended)

1. Push this project to GitHub.
2. Sign in to Netlify and click `Add new site` -> `Import from Git`.
3. Select the repo.
4. Build command: leave empty.
5. Publish directory: `.`
6. Deploy.

After deploy, set your custom domain in Netlify `Domain settings`.

## Option 2: GitHub Pages

1. Push project to GitHub.
2. Repo `Settings` -> `Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main` (or `master`), folder `/ (root)`.
5. Save and wait for publish URL.

## Option 3: cPanel / shared hosting

1. Zip the project.
2. In cPanel File Manager, open `public_html`.
3. Upload and extract files directly into `public_html`.
4. Ensure `index.html` is in `public_html` root.

## Recommended structure

- Active media: `assets/images/showcase/*`
- Legacy imports: `assets/images/archive/pictures/*`
- Keep production pages in root: `index.html`, `shop.html`, `about.html`, `contact.html`, `quote.html`, `legal.html`

## Post-deploy checks

1. Hard-refresh browser (`Ctrl+F5`).
2. Test mobile menu and page links.
3. Test WhatsApp, call, and email links.
4. Verify no broken images in homepage and shop sections.
