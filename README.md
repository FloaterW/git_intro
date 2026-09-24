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

- `site.ts`: name, tagline, email, links, graduation date, résumé and photo
- `projects.ts`: the project list and each project's write-up, numbers and links
- `resume.ts`: education, experience and skills

Images and files live in `public/`:

- `public/images/projects/<slug>.png`: project screenshots (about 1600×1000 works well)
- `public/images/projects/<slug>-demo.webm`: optional short demo clip (set `video` on the project)
- `public/resume.pdf`: the résumé download
- `src/app/opengraph-image.png`: the image shown when the site is shared on LinkedIn, Slack, etc.

## Before publishing

A lot of the current content is made up so the layout could be filled in. Every made-up value is marked `PLACEHOLDER`:

```bash
grep -rn PLACEHOLDER src public
```

That covers the project numbers and stories, the GitHub and demo links, the experience entries, the GPA, the graduation date, the About paragraph and the photo. The screenshots, the chess demo clip and `public/resume.pdf` are generated mock-ups too. Replace all of them.

## Tests

```bash
npm test
```

This builds the site, starts it, and runs the Playwright tests on desktop, tablet and phone sizes. If a server is already running on port 3000 it uses that instead.
