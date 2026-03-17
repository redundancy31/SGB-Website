# SGB Engineering Pte Ltd - Marketing Website

Production-ready corporate marketing site built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Framer Motion, and Lucide icons.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (subtle reveal animations)
- Lucide icons
- Structured content data files for fast editing

## Install

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

Open `http://localhost:3000`.

Development now uses `.next-dev` while production builds use `.next`, so dev and build artifacts do not collide.

If the dev server shows missing manifest files or repeated `ENOENT` errors, stop it and run:

```bash
npm run dev:reset
```

`npm run dev:turbo` remains available if you explicitly want Turbopack.

## Build

```bash
npm run build
```

## Content Editing

Update these files to change website content without rewriting components:

- `data/company.ts`
- `data/services.ts`
- `data/projects.ts`
- `data/certifications.ts`
- `data/leadership.ts`
- `data/faqs.ts`

## Replace Placeholder Images

Place images under:

- `public/placeholders/`

Examples currently referenced:

- `/placeholders/hero-project.jpg`
- `/placeholders/project-01.jpg`
- `/placeholders/cert-iso9001.jpg`
- `/placeholders/team-managing-director.jpg`

If files are missing, UI renders graceful placeholder blocks automatically.

## Routes

- `/`
- `/about`
- `/services`
- `/projects`
- `/projects/[slug]`
- `/certifications`
- `/safety-quality`
- `/careers`
- `/contact`
- `/privacy-policy`
- `/terms`

## Architecture

- `app/` - pages, metadata routes, layout
- `components/` - reusable UI and section components
- `components/sections/` - marketing section blocks
- `components/ui/` - shared primitive components
- `data/` - central content model
- `lib/` - utility helpers
- `public/placeholders/` - image placeholders
- `styles/` - reserved for future style modules

## SEO

- Per-page metadata in each route
- Open Graph metadata in layout
- JSON-LD organization schema on homepage
- `app/sitemap.ts`
- `app/robots.ts`

## Form Behavior

- Contact and careers forms are frontend-only placeholders.
- Contact form has client-side validation and success state.
- No backend submission is connected yet.
