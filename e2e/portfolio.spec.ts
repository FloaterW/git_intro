import { test, expect } from "@playwright/test";

const slugs = ["video-platform", "banking-app", "chess-engine", "housing-dashboard", "weather-app"];
const pages = ["/", "/projects", "/about", "/resume", ...slugs.map((s) => `/projects/${s}`)];

for (const path of pages) {
  test(`${path} renders without errors or leftover placeholders`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\bTODO\b|\bundefined\b|\bnull\b/);
    expect(errors).toEqual([]);
  });
}

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

test("contact link works from every page", async ({ page }) => {
  for (const path of ["/", "/projects", "/resume", "/projects/chess-engine"]) {
    await page.goto(path);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
  }
});

test("home page lists projects that link to their write-ups", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Chess engine/ }).click();
  await expect(page).toHaveURL(/\/projects\/chess-engine$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Chess engine");
});

test("project pages link to their neighbours", async ({ page }) => {
  await page.goto("/projects/banking-app");
  const more = page.getByRole("navigation", { name: "More projects" });
  await more.getByRole("link", { name: /Chess engine/ }).click();
  await expect(page).toHaveURL(/\/projects\/chess-engine$/);
});

test("unknown pages show the 404 page", async ({ page }) => {
  const res = await page.goto("/projects/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
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
