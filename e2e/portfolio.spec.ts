import { test, expect } from "@playwright/test";
import { allTags, featuredProjects, projects } from "../src/content/projects";

const projectPaths = projects.map((p) => `/projects/${p.slug}`);
const pages = ["/", "/projects", "/about", "/resume", ...projectPaths];
const withVideo = projects.find((p) => p.video)!;
const withDemo = projects.find((p) => p.demo === "race-condition")!;
const withCode = projects.find((p) => p.code)!;

for (const path of pages) {
  test(`${path} renders cleanly with its own metadata`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\bTODO\b|\bPLACEHOLDER\b|\bundefined\b|\bnull\b|\bNaN\b/);
    expect(errors).toEqual([]);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });
}

test("each project has its own link preview", async ({ page, request }) => {
  for (const p of projects) {
    await page.goto(`/projects/${p.slug}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", p.title);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    const res = await request.get(new URL(og!).pathname);
    expect(res.headers()["content-type"]).toBe("image/png");
  }
  expect((await request.get("/projects/nope/opengraph-image")).status()).toBe(404);
});

test("nav links go to the right pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });

  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");

  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);

  await nav.getByRole("link", { name: "Resume" }).click();
  await expect(page).toHaveURL(/\/resume$/);
});

test("changing pages jumps to the top instead of scrolling", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-scroll-behavior", "smooth");
});

test("contact link reaches the contact section from every page", async ({ page }) => {
  for (const path of ["/", "/projects", "/resume", projectPaths[0]]) {
    await page.goto(path);
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page.getByRole("heading", { name: "Get in touch" })).toBeInViewport();
  }
});

test("home page has a clear call to action", async ({ page }) => {
  await page.goto("/");
  const resume = page.getByRole("link", { name: "Download resume" });
  await expect(resume).toBeVisible();
  await expect(resume).toHaveAttribute("download", "");
  await expect(page.locator("main").getByRole("link", { name: /GitHub/ })).toBeVisible();
  await expect(page.locator("main").getByRole("link", { name: /LinkedIn/ })).toBeVisible();
});

test("home page shows featured projects that link to their write-ups", async ({ page }) => {
  await page.goto("/");
  for (const p of featuredProjects) {
    await expect(page.locator("main").getByRole("heading", { name: p.title })).toBeVisible();
  }
  const img = page.locator("main li img, main a img").last();
  const box = await img.boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(1.6, 1);

  const first = featuredProjects[0];
  await page
    .locator("main")
    .getByRole("link", { name: new RegExp(first.title) })
    .first()
    .click();
  await expect(page).toHaveURL(new RegExp(`/projects/${first.slug}$`));
});

test("project filters narrow the list", async ({ page }) => {
  await page.goto("/projects");
  const cards = page.locator("main li");
  await expect(cards).toHaveCount(projects.length);
  for (const tag of allTags) {
    await page.getByRole("button", { name: new RegExp(`^${tag}`) }).click();
    await expect(cards).toHaveCount(projects.filter((p) => p.tags.includes(tag)).length);
  }
  await page.getByRole("button", { name: /^All/ }).click();
  await expect(cards).toHaveCount(projects.length);
});

test("project pages show media, facts, diagram and links", async ({ page }) => {
  const p = projects.find((x) => !x.video && x.links.live && x.links.github)!;
  await page.goto(`/projects/${p.slug}`);
  const img = page.locator("article img").first();
  await expect(img).toBeVisible();
  expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByText("My role")).toBeVisible();
  await expect(page.getByRole("link", { name: /^Live demo/ })).toHaveAttribute(
    "href",
    p.links.live!,
  );
  await expect(page.getByRole("link", { name: /^Source code/ })).toHaveAttribute(
    "href",
    p.links.github!,
  );
  await expect(page.getByRole("heading", { name: "How it's built" })).toBeVisible();

  await page.goto(`/projects/${withCode.slug}`);
  await expect(page.getByRole("heading", { name: "A piece of the code" })).toBeVisible();
});

test("race condition demo loses money without locks and not with them", async ({ page }) => {
  await page.goto(`/projects/${withDemo.slug}`);
  const run = page.getByRole("button", { name: /^Run/ });

  await page.getByRole("button", { name: "Without locks" }).click();
  await run.click();
  await expect(page.getByText(/disappeared|appeared out of nowhere/)).toBeVisible();

  await page.getByRole("button", { name: "With row locks" }).click();
  await run.click();
  await expect(page.getByText(/Total is still \$10,000/)).toBeVisible();
});

test("demo video plays, has controls, and respects reduced motion", async ({ browser }) => {
  const normal = await browser.newPage();
  await normal.goto(`/projects/${withVideo.slug}`);
  const video = normal.locator("article video");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("poster", withVideo.video!.poster);
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
  await normal.close();

  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const reduced = await ctx.newPage();
  await reduced.goto(`/projects/${withVideo.slug}`);
  await reduced.waitForLoadState("networkidle");
  expect(await reduced.locator("article video").evaluate((v: HTMLVideoElement) => v.paused)).toBe(
    true,
  );
  await ctx.close();
});

test("project pages link to their neighbours", async ({ page }) => {
  await page.goto(`/projects/${projects[1].slug}`);
  const more = page.getByRole("navigation", { name: "More projects" });
  await more.getByRole("link", { name: new RegExp(projects[2].title) }).click();
  await expect(page).toHaveURL(new RegExp(`/projects/${projects[2].slug}$`));
});

test("keyboard users can skip to the content", async ({ page }) => {
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});

test("unknown pages show the 404 page", async ({ page }) => {
  for (const path of ["/nope", "/projects/does-not-exist"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  }
});

test("static files exist", async ({ request }) => {
  const files = [
    ...projects.map((p) => p.image),
    ...projects.flatMap((p) => (p.video ? [p.video.webm, p.video.mp4, p.video.poster] : [])),
    "/resume.pdf",
    "/favicon.ico",
    "/icon.svg",
    "/opengraph-image.png",
    "/sitemap.xml",
  ];
  for (const f of files) {
    expect((await request.get(f)).status(), f).toBe(200);
  }
});

test("no horizontal scrolling", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("nothing scrolls sideways on the smallest phones", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
  await ctx.close();
});

test("short pages don't scroll at all", async ({ page }) => {
  await page.goto("/nope");
  const extra = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  expect(extra).toBeLessThanOrEqual(0);
  await expect(page).toHaveTitle(/Page not found/);
});

test("project filter survives going back", async ({ page }) => {
  const tag = allTags.find((t) => projects.filter((p) => p.tags.includes(t)).length > 0)!;
  const match = projects.find((p) => p.tags.includes(tag))!;
  await page.goto("/projects");
  await page.getByRole("button", { name: new RegExp(`^${tag}`) }).click();
  await expect(page).toHaveURL(new RegExp(`tag=${tag}`));
  await page
    .locator("main")
    .getByRole("link", { name: new RegExp(match.title) })
    .click();
  await expect(page).toHaveURL(new RegExp(`/projects/${match.slug}$`));
  await page.goBack();
  await expect(page.getByRole("button", { name: new RegExp(`^${tag}`) })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("the demo's Run button keeps keyboard focus", async ({ page }) => {
  await page.goto(`/projects/${withDemo.slug}`);
  const run = page.getByRole("button", { name: /^Run/ });
  await run.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/disappeared|appeared out of nowhere|luck/)).toBeVisible();
  await expect(run).toBeFocused();
});

test("copy email puts the address on the clipboard", async ({ browser }) => {
  const ctx = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  const href = await page.locator("footer a[href^='mailto:']").first().getAttribute("href");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(href!.slice(7));
  await expect(page.getByRole("button", { name: "Copy email" })).toBeVisible({ timeout: 4000 });
  await ctx.close();
});

test("tabbing never hides the focused element under the sticky header", async ({ page }) => {
  await page.goto("/resume");
  await page.locator("footer a[href^='mailto:']").first().focus();
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Shift+Tab");
    const covered = await page.evaluate(() => {
      const header = document.querySelector("header")!.getBoundingClientRect();
      const el = document.activeElement!.getBoundingClientRect();
      return el.top < header.bottom;
    });
    expect(covered).toBe(false);
  }
});
