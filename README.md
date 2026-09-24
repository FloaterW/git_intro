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

- `site.ts`: name, email, links, and switches for the resume PDF and photo
- `projects.ts`: the project list and each project's write-up
- `resume.ts`: education, experience and skills

## Tests

```bash
npm run dev          # in one terminal
npx playwright test  # in another
```
