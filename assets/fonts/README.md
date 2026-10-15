# Axis website fonts

The existing Space Grotesk and Inter fonts are served from this site to avoid
external font-service connections. These are unchanged WOFF2 files supplied by
Google Fonts: Inter v20 and Space Grotesk v22, downloaded 15 October 2026.
Both families retain their SIL Open Font License notices beside the files.

`../fonts.css` retains the provider's Unicode subsets and uses `font-display:
swap`. Only the Latin subsets used on every page are preloaded; other subsets
download only when their characters are needed. All weights share the variable
font files, rather than downloading a separate file for each weight.

Source stylesheet:
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&family=Inter:wght@400..700&display=swap

If the font binaries change, use new versioned filenames and update both the
stylesheet and the HTML preloads together. Keep the licence notices.
