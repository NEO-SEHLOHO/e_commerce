# B&T Apparel Website Documentation and Image Guide

## 1) What this website is
This is a static multi-page website for a school uniform business. It is built with:

- HTML pages for content and layout
- One main CSS file for design and responsive behavior
- One main JavaScript file for UI interactions (menu, filters, slideshow)
- Local image assets for logo, hero, product, and icon visuals

No backend/database is required for the current version.

## 2) What was done to develop the website
The current site includes:

- Branded, responsive header/navigation and mobile drawer
- Home page sections (hero slideshow, categories, featured products, info sections)
- Shop catalog layout with filters and product cards
- Quote, contact, cart, checkout, about, and legal pages
- Unified visual style system in `styles.css` (colors, spacing, cards, buttons, typography)
- Basic interaction logic in `main.js`

## 3) Main files you can edit
- `index.html`: home page content and most homepage images
- `shop.html`: shop/catalog content and product images
- `about.html`, `quote.html`, `contact.html`, `cart.html`, `checkout.html`, `legal.html`: page content
- `styles.css`: layout, image behavior, colors, spacing, responsive rules
- `main.js`: mobile menu, filter panel toggle, accordion behavior, hero slideshow
- `assets/images/...`: all image files used by the pages

## 4) Current image system (important for resizing)
This site uses fixed aspect ratios in CSS for consistent design:

- Hero slideshow images: `5:4` ratio (`.hero-slideshow`, `.hero-image`)
- Product card images: `4:3` ratio (`.product-media img`)
- Split section images: full area cover (`.split-media img`) - keep medium-wide photos
- Logo images: square `1:1` with `srcset` (`logo-256`, `logo-512`, `logo-1024`)

Because `object-fit: cover` is used, wrong aspect ratios will crop awkwardly.

## 5) Recommended image sizes and format
Use these targets before uploading/replacing:

- Hero images: `1500 x 1200` (or any clean `5:4` size)
- Product images: `1200 x 900` (or any clean `4:3` size)
- Split/feature wide images: around `1600 x 1000`
- Logo: keep square sizes (`256x256`, `512x512`, `1024x1024`)

Format rules:

- Photos: `.jpg` (quality 75-85%)
- Transparent graphics/logos: `.png`
- Icons: `.svg` where possible

Suggested size limit per image:

- Hero: under `500 KB`
- Product: under `300 KB`
- Icons/logo small variants: as small as possible

## 6) How to remove pictures you no longer want
Follow this safe order:

1. Find where the image is used:
   - Search the filename in `index.html`, `shop.html`, and other pages.
2. Replace or remove the `<img ...>` element:
   - Replace `src="assets/images/...old-file..."` with new file path, OR
   - Remove the full product/slide block if not needed.
3. If you remove a hero slide in `index.html`, also remove one matching dot button inside `.hero-dots`.
4. Test in browser to confirm layout still looks correct.
5. Delete the old image file from `assets/images/...` only after no page references it.

## 7) How to resize your pictures (simple workflow)
Use Canva, Photoshop, Photopea, or any editor:

1. Open image.
2. Crop to the right aspect ratio first (`5:4` hero or `4:3` product).
3. Resize to target pixel dimensions.
4. Export as JPG (or PNG if transparency is required).
5. Compress if file is too large.
6. Save with clear names like:
   - `hero-school-uniform-01.jpg`
   - `product-grey-blazer-01.jpg`

## 8) ChatGPT-ready image formatting prompt (copy/paste)
Use this prompt when asking ChatGPT to help prepare images:

```text
I am preparing images for a school uniform website.
Please give me exact crop + resize settings for these image types:
- Hero banner: 5:4 ratio, final 1500x1200 JPG, under 500KB
- Product card: 4:3 ratio, final 1200x900 JPG, under 300KB
- Keep subject centered and avoid cutting off heads/logos
- Keep colors natural and sharpen lightly
Also suggest final filenames and alt text for each image.
```

If you upload a picture to ChatGPT, include:

- where it will be used (`hero` or `product`)
- target size
- whether background transparency is needed

## 9) Quick checklist before publishing
- All new images use correct aspect ratio
- No broken image paths in HTML
- Hero slide count matches hero dots
- Old removed images are not referenced anywhere
- Mobile and desktop views both checked

