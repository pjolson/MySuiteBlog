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

## 07_youtube/
- `youtube-channel-banner-2048x1152.png` — channel art, YouTube's minimum
  upload size (0.56 MB, well under the 6 MB cap)
- `youtube-channel-banner.svg` — source

  YouTube crops channel art differently on every device. Only the centred
  **1235 x 338** box is visible everywhere, so the wordmark and all text sit
  inside it; the gradient and bracket pattern bleed to the full canvas for
  television and wide desktop viewers. If you re-edit this file, keep text
  inside that box or phone viewers will see it cut off.

---

Note: the pack specifies `DejaVu Sans` first in every font stack, which is
what the May 2026 renders used. The 07_youtube render was produced on macOS,
where DejaVu is absent, so it fell back to the system UI font. The type there
matches the website rather than the older PNGs. Install DejaVu Sans before
re-rendering if you want the original lettering.

The SVG files are the source of truth — open in Figma, Illustrator, Inkscape,
or any vector editor to modify. Re-render to PNG with `cairosvg`, `rsvg-convert`,
or by exporting from your editor.
