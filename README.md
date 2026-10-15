# Axis Engineering — Website

Marketing website for **Axis Engineering** — design and manufacture of linear
induction motors (LIMs) and permanent-magnet (magnetic) braking solutions.

A static multi-page site: a short homepage, product/application pages and a
dedicated `contact/` page. Homepage/contact styles and behaviour live in
`assets/home.css` and `assets/home.js`; inner pages use the shared brand styles
in `assets/home.css` plus `assets/site-pages.css` and `assets/site-pages.js`.
No build step and no dependencies.

**Hosting:** GitHub Pages — served from the `main` branch (root) at
<https://www.axisengineering.co.uk/>. Pushing to `main` triggers deployment.
Verify the deployment and the custom domain before describing a change as live.

Keep the homepage a signpost, not a technical brochure. Detailed engineering
explanations belong on the existing product, application and resources pages.
Existing homepage fragment links remain supported.

Keep inner pages concise: a short overview, four focused sections, comparison
tables/checklists and links to related technical detail. Important operating
limits stay visible. The six original vector illustrations are shown inline
and animate automatically, with no dropdowns or playback buttons. Reduced-motion
and print views remain static. Mobile tables show their column labels; diagrams can pan inside their
own panels. Privacy-policy wording is not part of routine copy shortening.

The enquiry form uses the existing Web3Forms endpoint. Test success/failure with
a mocked request; do not send test enquiries to the real sales inbox. A client
timeout is an uncertain delivery state, not proof that the enquiry was rejected.

Local audit scripts, screenshots and predecessor snapshots are under the ignored
`audit-artifacts/` directory and must not be deployed. Preview with a local HTTP
server, not a file URL, because asset and page links are root-relative.
