# mysuite — brand asset pack

Generated May 2026. All assets derived from the same SVG source so they're
visually consistent. Use SVG wherever possible; PNG renders are provided
for tools that don't accept SVG.

## 00_brand-overview
Single-page reference showing logo, palette, type, and usage rules. Start here.

## 01_logo/
- `wordmark-*.svg/.png` — the full [my]suite integrated wordmark
- `mark-*.svg/.png` — just the [my] mark, for square spaces
- Variants for color-on-light, color-on-dark, mono black, mono white

## 02_favicon/
- `favicon.ico` — drop into your site root
- `favicon-{16,32,48,96,192,512}.png` — for explicit <link> tags
- `apple-touch-icon-180.png` — iOS home screen
- Source SVGs included so you can re-export at any size

Add to your site's <head>:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png">
```

## 03_linkedin/
- `linkedin-profile-400x400.png` — square avatar (personal & company)
- `linkedin-personal-banner-1584x396.png` — your profile banner
  (content offset right to avoid profile photo overlap)
- `linkedin-company-cover-1128x191.png` — for the MySuite Consulting LinkedIn page

## 04_social/
- `og-image-1200x630.png` — Open Graph image for link previews when
  blog posts get shared. Reference in <head>:
  ```html
  <meta property="og:image" content="https://mysuite.tech/og-image.png">
  ```
- `twitter-card-1200x675.png` — same idea for X/Twitter cards

## 05_email/
- `email-signature-logo-*.png` — embed in email signatures
  (retina version is 2x for high-DPI displays)
- `email-signature.html` — copy/paste HTML for Gmail/Outlook/Apple Mail
  (host the PNG somewhere accessible and update the image URL)

## 06_documents/
- `invoice-header.svg/.png` — letterhead strip for invoices and proposals.
  PNG is rendered at 2400px wide for crisp print output.

---

The SVG files are the source of truth — open in Figma, Illustrator, Inkscape,
or any vector editor to modify. Re-render to PNG with `cairosvg`, `rsvg-convert`,
or by exporting from your editor.
