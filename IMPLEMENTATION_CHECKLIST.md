# J MEDIA Creative Clone Implementation Checklist

## P0. Base Setup

- [x] Create a separate J MEDIA project folder
- [x] Copy J MEDIA brand logo and portfolio images into this project
- [x] Build hero, intro, highlights, owned labs, and contact entry sections
- [x] Check desktop and mobile image framing
- [x] Check horizontal overflow on desktop and mobile

## P1. Visual And Interaction Polish

- [x] Strengthen hero entry animation and first impression
- [x] Tune scroll reveal rhythm for intro cards and copy
- [x] Add hover movement, image scale, card numbering, and cursor label effects for work cards
- [x] Smooth J MEDIA WORLD card movement
- [x] Add mobile-safe motion behavior
- [x] Expand highlighted works to the current portfolio set
- [x] Add desktop hover preview and mobile tap preview

## P2. Detail Pages

- [x] Create information detail page
- [x] Create tool detail page
- [x] Create local/map detail page
- [x] Create engagement detail page
- [x] Add visual category and related work sections to detail pages
- [x] Link highlight cards to the matching detail pages

## P3. Company, Approach, And Contact

- [x] Create About page
- [x] Create Approach page
- [x] Create Contact page
- [x] Connect EmailJS form structure for J MEDIA contact
- [x] Keep existing external EmailJS settings untouched
- [x] Normalize official email to `weblaunch.j@gmail.com`
- [x] Clean contact form payload labels and status messages

## P4. Deployment Prep

- [x] Create GitHub repository
- [x] Push project to GitHub
- [x] Add Cloudflare-ready static site files
- [x] Confirm production URL works
- [x] Run desktop and mobile QA
- [x] Add robots, sitemap, manifest, canonical, and OG image
- [ ] Confirm Cloudflare Pages Git Provider connection in the Cloudflare dashboard
- [ ] Connect custom domain and replace `pages.dev` canonical/sitemap URLs

## P5. Optimization And Productization

- [x] Generate WebP variants for portfolio images
- [x] Add Open Graph image
- [x] Split project data into `project-data.js`
- [x] Document image optimization, works routing, and service-page split decisions
- [x] Add reusable customer industry template section
- [ ] Run full Lighthouse mobile audit after deployment access is final

## Principles

- Do not copy source code, copy, images, or proprietary brand assets from the reference site.
- Reinterpret only structure, interaction rhythm, and section flow for the J MEDIA brand.
- Verify visible changes with browser screenshots before shipping.
