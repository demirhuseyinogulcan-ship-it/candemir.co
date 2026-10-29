# candemir.co

My earlier studio site, before [commitius](https://commitius.com). A dark, cinematic portfolio in Turkish and English: an intro animation, a process timeline that draws itself on scroll, selected work shown inside laptop and phone mockups with screen recordings, and a design board that documents the visual system.

The site is no longer live. The code is kept as a reference for the motion and layout work.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static generation)
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion
- Node's built-in test runner

## What is in it

- Turkish and English routes under `app/[locale]`, with locale detection in `proxy.ts` (the Next.js 16 replacement for middleware).
- Home sections: hero with an intro overlay, process, expertise, selected work and a contact call to action.
- Project pages (`/work/[id]`) with device mockups that play desktop and mobile screen recordings.
- A design board (`/design-board`) with the colour palette, typography, buttons, animation showcase and architecture notes.
- Light and dark themes with a smooth transition.
- Small tests for the process data, the project list and the mockup layout contract.

## Project structure

```
app/
  [locale]/
    page.tsx              home
    work/[id]/            project pages
    design-board/         visual system
  components/
    hero/, sections/      home page
    projects/             device mockups and project page
    design-board/         design board sections
    layout/, ui/, scroll/, brand/
  lib/
    constants.ts          projects, process steps, contact
    i18n/                 locale config and dictionaries
    design-tokens.ts      colours, spacing, motion
    mockup-config.ts      mockup sizes and screen insets
    seo/                  metadata helpers
proxy.ts                  locale redirect
public/images, public/videos   project media
scripts/compress-videos.mjs    shrinks screen recordings with ffmpeg
test/                     node:test suites
```

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm test` | tests with Node's test runner |
| `node scripts/compress-videos.mjs --all` | compress new screen recordings in `public/videos` (needs ffmpeg) |
