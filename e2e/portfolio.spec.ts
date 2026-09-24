import { test, expect } from "@playwright/test";
import { projects } from "../src/content/projects";

const projectPaths = projects.map((p) => `/projects/${p.slug}`);
const pages = ["/", "/projects", "/about", "/resume", ...projectPaths];

for (const path of pages) {
  test(`${path} renders cleanly with its own metadata`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\bTODO\b|\bPLACEHOLDER\b|\bundefined\b|\bnull\b/);
    expect(errors).toEqual([]);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });
}

test("each project has its own link preview", async ({ page, request }) => {
  const p = projects[0];
  await page.goto(`/projects/${p.slug}`);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", new RegExp(p.title));
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toContain(`/projects/${p.slug}/opengraph-image`);
  expect((await request.get(new URL(og!).pathname)).headers()["content-type"]).toBe("image/png");
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

test("contact link reaches the contact section from every page", async ({ page }) => {
  for (const path of ["/", "/projects", "/resume", projectPaths[0]]) {
    await page.goto(path);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    await expect(page.getByRole("heading", { name: "Get in touch" })).toBeInViewport();
  }
});

test("home page has a clear call to action", async ({ page }) => {
  await page.goto("/");
  const resume = page.getByRole("link", { name: "Download resume" });
  await expect(resume).toBeVisible();
  await expect(resume).toHaveAttribute("download", "");
  await expect(page.locator("main").getByRole("link", { name: "GitHub" })).toBeVisible();
  await expect(page.locator("main").getByRole("link", { name: "LinkedIn" })).toBeVisible();
});

test("project cards keep their image shape and link to write-ups", async ({ page }) => {
  await page.goto("/");
  const img = page.locator("main li img").first();
  const box = await img.boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(1.6, 1);

  await page.getByRole("link", { name: /Chess engine/ }).click();
  await expect(page).toHaveURL(/\/projects\/chess-engine$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Chess engine");
});

test("project pages show media, facts and links", async ({ page }) => {
  await page.goto("/projects/banking-app");
  const img = page.locator("article img").first();
  await expect(img).toBeVisible();
  expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByText("My role")).toBeVisible();
  await expect(page.getByRole("link", { name: "Live demo" })).toHaveAttribute("href", /^https:/);
  await expect(page.getByRole("link", { name: "Source code" })).toHaveAttribute("href", /github\.com/);
  await expect(page.getByRole("heading", { name: "A piece of the code" })).toBeVisible();
});

test("demo video plays, has controls, and respects reduced motion", async ({ browser }) => {
  const normal = await browser.newPage();
  await normal.goto("/projects/chess-engine");
  const video = normal.locator("article video");
  await expect(video).toHaveAttribute("controls", "");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
  await normal.close();

  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const reduced = await ctx.newPage();
  await reduced.goto("/projects/chess-engine");
  await reduced.waitForTimeout(1000);
  expect(await reduced.locator("article video").evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
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
    "/images/projects/chess-engine-demo.webm",
    "/images/projects/chess-engine-demo.mp4",
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
