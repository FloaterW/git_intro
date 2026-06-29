# faradwahab.com

Personal portfolio site. Built with Next.js, TypeScript, and Tailwind CSS.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing content

All content lives in `src/content/`:

- **site.ts** — Name, links, metadata
- **projects.ts** — Project entries and case study content
- **skills.ts** — Skill groups
- **resume.ts** — Education, experience, coursework

Update these files and the site rebuilds. Look for `TODO` comments for fields that need real values.

## Building for production

```bash
npm run build
npm start
```

## Deploying

Works with Vercel, Netlify, or any Node.js host. For static export, add `output: 'export'` to `next.config.ts`.
