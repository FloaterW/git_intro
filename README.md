# faradwahab.com

My personal site. Next.js, TypeScript and Tailwind.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

Text lives in `src/content/`, not in the page files:

- `site.ts`: name, tagline, email, links, what I'm looking for, the "Currently" line, résumé and photo
- `projects.ts`: each project's write-up, numbers, links, tags, architecture steps and code sample. `featured: true` puts it on the home page; the first featured project gets the wide card.
- `resume.ts`: education, experience and skills

Images and files live in `public/`:

- `public/images/projects/<slug>.png`: project screenshots (about 1600×1000 works well; Next resizes them)
- Optional demo clip: set `video` on the project to a `.webm` and an `.mp4` of the same clip (the MP4 is for older Safari) and a small `poster` image
- `public/resume.pdf`: the résumé download
- `src/app/opengraph-image.png`: the share image for the site. Each project page generates its own from `projects.ts`.

## Before publishing

A lot of the current content is made up so the layout could be filled in. Every made-up value is marked `PLACEHOLDER`:

```bash
grep -rn PLACEHOLDER src public
```

That covers the project numbers and stories, the GitHub and demo links, the experience entries, the GPA, the graduation date, the "Currently" line, the About paragraph and the photo. The screenshots, the chess demo clip and `public/resume.pdf` are generated mock-ups too. Replace all of them.

## Formatting

```bash
npm run format
```

Prettier with the Tailwind plugin, which also sorts class names.

## Tests

```bash
npm test
```

This builds the site, starts it, and runs the Playwright tests on desktop, tablet and phone sizes. If a server is already running on port 3000 it uses that instead. To use a Chromium you already have installed, set `CHROMIUM_PATH`.
