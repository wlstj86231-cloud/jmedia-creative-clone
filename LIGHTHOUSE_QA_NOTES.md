# Lighthouse QA Notes

Full Lighthouse mobile scoring still needs a final deployed URL or a local environment with the Lighthouse CLI available.

Completed local checks:

- JavaScript syntax check for `script.js` and `project-data.js`
- CSS brace balance check
- HTML section/div balance check
- Local asset reference check
- Chrome headless screenshots at iPhone 13 mini size for home and contact pages

Current known external follow-ups:

- Confirm Cloudflare Pages Git Provider connection
- Connect custom domain, then update canonical, sitemap, and robots URLs
- Run Lighthouse mobile performance/accessibility audit against the final production URL
