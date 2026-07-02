# Decap CMS Setup Guide — K.H. Roofing Website

This guide sets up **Decap CMS** (formerly Netlify CMS) so you can edit your site's text and images from a simple admin panel — no code editing required. Your existing design, layout, animations and Leaflet map are **completely untouched**. Only the specific text/image spots below became editable; everything else is exactly as it was.

## What changed in your files (and why)

1. **`index.html`** — identical to your original, except ~80 elements (headings, paragraphs, images) now have an `id="cms-..."` attribute so a script can find and update them. No classes, styles, or structure were touched.
2. **`content-loader.js`** (new file) — a small script that runs on page load, fetches the JSON files below, and drops the text/images into those elements.
3. **`content/*.json`** (new files) — one JSON file per section (hero, about, services, testimonials, portfolio, coverage, contact, footer), pre-filled with your current content. These are what Decap CMS edits.
4. **`admin/index.html`** and **`admin/config.yml`** (new) — the CMS admin app itself and its configuration.

The map, animations, nav, and everything not listed in `config.yml` stays hard-coded in `index.html` exactly as you built it.

## How it works (big picture)

```
You log into /admin  →  edit a form  →  Decap CMS commits the change to
content/*.json in your Git repo  →  your live site re-fetches that JSON
on next page load  →  the visible text/image updates.
```

No build step, no database, no server — it's just Git + JSON + a tiny fetch script.

---

## Step 1 — Put the site in a Git repository

Decap CMS needs your site to live in a Git repo (GitHub, GitLab, or Bitbucket).

```bash
cd your-site-folder
git init
git add .
git commit -m "Initial site with Decap CMS"
```

Push it to a new **GitHub** repository (simplest option — create one at github.com/new, then):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2 — Deploy the site to Netlify (recommended)

Netlify gives you free hosting **and** the easiest login system for Decap CMS (Netlify Identity + Git Gateway), so you don't need to set up OAuth yourself.

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Connect your GitHub account and pick the repo you just pushed.
3. Build settings: leave **Build command** blank and set **Publish directory** to the folder containing `index.html` (likely the repo root, `.` or `/`).
4. Click **Deploy site**. You'll get a URL like `random-name-123.netlify.app`.

## Step 3 — Turn on Netlify Identity + Git Gateway

This is what lets you log into `/admin` and have your edits saved back to GitHub, without managing GitHub accounts for your client/editors.

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity**.
2. Under **Registration preferences**, set to **Invite only** (so random people can't sign up).
3. Scroll to **Services → Git Gateway → Enable Git Gateway**. This lets Identity-authenticated users write to your repo without needing their own GitHub token.
4. Go to **Identity → Invite users**, enter your email, and accept the invite email to set your password.

## Step 4 — Confirm the CMS backend config

`admin/config.yml` is already set to use this login method:

```yaml
backend:
  name: git-gateway
  branch: main
```

If your default branch isn't `main` (e.g. it's `master`), change that line to match.

## Step 5 — Log in and edit

1. Visit `https://your-site.netlify.app/admin/`.
2. Log in with the email/password from Step 3.
3. You'll see collections on the left: **Hero Section, About, Services, Testimonials, Portfolio, Coverage, Contact, Footer.**
4. Edit any field, click **Publish**. Decap commits the change straight to `content/*.json` in your GitHub repo.
5. Netlify automatically rebuilds and redeploys (near-instant since there's no real "build" — it's a static file). Refresh your live site and the change appears.

## Step 6 — (Optional) Preview locally before deploying

To test the CMS on your machine before pushing anything live:

```bash
npx decap-server
```

Then in `admin/config.yml`, temporarily switch the backend to:

```yaml
backend:
  name: test-repo
```

This runs a local mock backend — good for trying out the interface, but changes aren't saved to GitHub. Switch back to `git-gateway` before deploying for real.

---

## What's editable vs. not

**Editable via `/admin`:**
- Hero heading, subtext, badges, hero image
- About heading, paragraph, both stat numbers/labels, about image
- All 5 service cards (icon name, title, description)
- All 3 testimonials (quote, name, location, initials)
- All 12 portfolio images (image + alt text)
- Coverage heading/subtext + all 5 region cards
- Contact heading, HQ address, email, 3 office phone numbers
- Footer tagline, phone, email, copyright line

**Not wired to the CMS** (left exactly as you built them, since editing these risks breaking behavior — ask if you want any of these added later):
- The interactive Leaflet coverage map and its ~30 markers (these are generated by JavaScript with coordinates, not simple text)
- Navigation links, footer link lists ("Expertise"/"Company" columns)
- The contact form fields/labels
- Colors, fonts, spacing, animations — nothing about the *look* of the site is CMS-controlled, only content

## Notes on images

Uploading a new image in Decap CMS saves it into `content/uploads/` in your repo and points the JSON at that path. Your current images (Google-hosted URLs) will keep working as-is until you replace them.

## Icon names for Services

The "Icon" field for each service expects a [Material Symbols](https://fonts.google.com/icons) name (the font your site already loads), e.g. `grid_view`, `home_repair_service`, `emergency`, `architecture`, `layers`, `roofing`, `build`, `handyman`. Type the exact icon name as shown on that site.
