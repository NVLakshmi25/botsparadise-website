# BOTSPARADISE Technologies — Frontend Website

A responsive eight-page fictional software company website built with HTML5, CSS3, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript.

## Pages
- `index.html` — Home
- `about.html` — About us
- `services.html` — Services
- `portfolio.html` — Portfolio with category filters
- `team.html` — Sample team profiles
- `careers.html` — Sample job listings and browser-only application form
- `contact.html` — Contact form with client-side validation
- `faq.html` — Frequently asked questions

## Run locally
1. Extract the ZIP file.
2. Open the `technova-solutions` folder in Visual Studio Code.
3. Open `index.html` in your browser, or use the **Live Server** extension in VS Code for a better development workflow.
4. Internet access is required for the Bootstrap CDN, Google Fonts, Bootstrap Icons, and remote Unsplash photos.

## Included interactions
- Responsive Bootstrap navigation on all pages
- Shared footer and active navigation state
- Light/dark theme toggle (preference saved in browser storage when available)
- Animated sample statistics on the home page
- Portfolio category filtering
- FAQ accordion
- Client-side validation for contact and career forms
- Role selection from job cards
- Back-to-top button

## Important before publishing
BOTSPARADISE Technologies is a fictional demo. Team profiles, photos, sample portfolio projects, statistics, job listings, and contact details are illustrative. Replace them with verified company information before using the site publicly. The forms only validate and show a demo message; they do **not** transmit or store submissions. Connect a backend or a trusted form service to receive real enquiries and applications.

## Customisation
- Main design tokens are at the top of `css/style.css` (`--navy`, `--blue`, etc.).
- Shared JavaScript is in `js/main.js`.
- Each page links to the same stylesheet and script.


Branding note: the shared navigation uses the BOTSPARADISE logo image URL supplied by the site owner. The BOTSPARADISE footer is included on all eight pages. Confirm the company contact details, legal entity name, and social links before deploying.
