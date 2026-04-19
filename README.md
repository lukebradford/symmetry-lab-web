# symmetrylab.app

Static marketing site for [Symmetry Lab](https://apps.apple.com/us/app/symmetry-lab/id327084012),
an iOS drawing app for symmetrical patterns.

- Plain HTML, CSS, and JavaScript. No build step, no framework, no bundler.
- Self-hosted fonts, single stylesheet, single small JS file.
- No analytics, no cookies, no tracking.

## Preview locally

From the repo root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server will do — `npx serve`, `caddy file-server`, etc.

## Deploy

The repo deploys unchanged to any static host:

- **Cloudflare Pages / Vercel / Netlify**: point at this repo; no build
  command, output directory `/`.
- **GitHub Pages**: push to `main` and enable Pages.

No server-side code, no environment variables required.

## Kit (email signup)

The signup section uses Kit's modal embed. Two pieces:

1. An anchor that triggers the modal:
   ```html
   <a class="signup-btn"
      data-formkit-toggle="cb0bc8368b"
      href="https://symmetry-lab.kit.com/cb0bc8368b">…</a>
   ```
2. Kit's embed script, loaded before `</body>`:
   ```html
   <script async data-uid="cb0bc8368b"
     src="https://symmetry-lab.kit.com/cb0bc8368b/index.js"></script>
   ```

The script hijacks the click and opens a Kit-hosted modal overlay. If the
script fails to load, the anchor's `href` degrades to the hosted form page
on `symmetry-lab.kit.com`.

The ID `cb0bc8368b` is the Kit form UID. To point at a different form,
replace both occurrences in `index.html`.

## Assets

Sources committed at the repo root: `clip.mov`, `icon.png`, `privacy.pdf`,
`support.html.bak` (the previous single-file support page).

Processed assets live under `assets/`. They were generated with:

```bash
# video — H.264 mp4 + VP9 webm + poster frame
ffmpeg -i clip.mov -an -vf "scale=-2:1440" -c:v libx264 -preset slow \
  -crf 26 -pix_fmt yuv420p -movflags +faststart assets/video/clip.mp4

ffmpeg -i clip.mov -an -vf "scale=-2:1440" -c:v libvpx-vp9 -crf 34 -b:v 0 \
  assets/video/clip.webm

ffmpeg -ss 0.5 -i clip.mov -frames:v 1 -q:v 3 \
  assets/images/video-poster.jpg

# icons — resized + optimized via Pillow
python3 -c "from PIL import Image; i=Image.open('icon.png').convert('RGBA'); \
  i.resize((320,320), Image.LANCZOS).save('assets/images/icon.png', optimize=True); \
  i.resize((180,180), Image.LANCZOS).save('assets/images/icon-180.png', optimize=True); \
  i.resize((32,32),  Image.LANCZOS).save('assets/images/icon-32.png',  optimize=True); \
  i.save('assets/images/favicon.ico', sizes=[(16,16),(32,32),(48,48)])"
```

The OG image (`assets/images/og-image.png`, 1200×630) is generated with a
short Pillow script — regenerate it if you change the wordmark or tagline.

## Fonts

Self-hosted from Google Fonts:

- `assets/fonts/syne.woff2` — Syne (variable, weight 400–800), used for
  headings and UI chrome.
- `assets/fonts/newsreader.woff2` — Newsreader (weight 400), used for body
  copy.

Both are preloaded in each page's `<head>` for fast first paint.

## File layout

```
/
├── index.html
├── privacy.html
├── support.html
├── 404.html
├── robots.txt
├── .gitignore
├── README.md
├── clip.mov              # source, not served
├── icon.png              # source, not served
├── privacy.pdf           # source reference
├── support.html.bak      # previous single-file support page
└── assets/
    ├── css/style.css
    ├── fonts/*.woff2
    ├── images/
    │   ├── icon.png, icon-32.png, icon-180.png
    │   ├── favicon.ico
    │   ├── og-image.png
    │   ├── video-poster.jpg
    │   └── app-store-badge.svg
    └── video/clip.mp4, clip.webm
```
