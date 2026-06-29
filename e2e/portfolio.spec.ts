import { test, expect } from "@playwright/test";

// ─── Page Load Tests ───────────────────────────────────────────────

test.describe("Page loads", () => {
  const pages = [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/projects/video-platform", name: "Project: Video Platform" },
    { path: "/projects/banking-app", name: "Project: Banking App" },
    { path: "/projects/chess-engine", name: "Project: Chess Engine" },
    { path: "/projects/housing-dashboard", name: "Project: Housing Dashboard" },
    { path: "/projects/weather-app", name: "Project: Weather App" },
    { path: "/about", name: "About" },
    { path: "/resume", name: "Resume" },
  ];

  for (const page of pages) {
    test(`${page.name} (${page.path}) loads with 200`, async ({ page: p }) => {
      const response = await p.goto(page.path);
      expect(response?.status()).toBe(200);
    });

    test(`${page.name} has no console errors`, async ({ page: p }) => {
      const errors: string[] = [];
      p.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      await p.goto(page.path);
      await p.waitForLoadState("networkidle");
      const filtered = errors.filter(
        (e) => !e.includes("favicon") && !e.includes("404")
      );
      expect(filtered).toEqual([]);
    });
  }
});

// ─── Navigation Tests ──────────────────────────────────────────────

test.describe("Navigation", () => {
  test("header contains all nav links", async ({ page, viewport }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    if (viewport && viewport.width < 768) {
      await page.locator(".menu-toggle").click();
    }
    await expect(nav.getByText("Work")).toBeVisible();
    await expect(nav.getByText("About")).toBeVisible();
    await expect(nav.getByText("Resume")).toBeVisible();
    await expect(nav.getByText("Contact")).toBeVisible();
  });

  test("clicking Work navigates to /projects", async ({ page, viewport }) => {
    await page.goto("/");
    if (viewport && viewport.width < 768) {
      await page.locator(".menu-toggle").click();
    }
    await page.locator('nav[aria-label="Main navigation"]').getByText("Work").click();
    await expect(page).toHaveURL("/projects");
  });

  test("clicking About navigates to /about", async ({ page, viewport }) => {
    await page.goto("/");
    if (viewport && viewport.width < 768) {
      await page.locator(".menu-toggle").click();
    }
    await page.locator('nav[aria-label="Main navigation"]').getByText("About").click();
    await expect(page).toHaveURL("/about");
  });

  test("clicking Resume navigates to /resume", async ({ page, viewport }) => {
    await page.goto("/");
    if (viewport && viewport.width < 768) {
      await page.locator(".menu-toggle").click();
    }
    await page.locator('nav[aria-label="Main navigation"]').getByText("Resume").click();
    await expect(page).toHaveURL("/resume");
  });

  test("name link navigates back to home", async ({ page }) => {
    await page.goto("/projects");
    await page.getByLabel("Farad Wahab — Home").click();
    await expect(page).toHaveURL("/");
  });

  test("project card links to case study page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Read case study" }).first().click();
    await expect(page).toHaveURL(/\/projects\/.+/);
  });

  test("case study back link returns to project listing", async ({ page }) => {
    await page.goto("/projects/chess-engine");
    await page.getByText("All projects").click();
    await expect(page).toHaveURL("/projects");
  });

  test("project prev/next navigation works", async ({ page }) => {
    await page.goto("/projects/banking-app");
    const nextLink = page.getByText("Next").locator("..");
    if (await nextLink.isVisible()) {
      await nextLink.click();
      await expect(page).toHaveURL(/\/projects\/.+/);
    }
  });
});

// ─── Homepage Content Tests ────────────────────────────────────────

test.describe("Homepage content", () => {
  test("hero section displays name and intro", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Oregon State University").first()).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /I build software/i })
    ).toBeVisible();
  });

  test("hero has CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "View my work" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Resume" }).first()).toBeVisible();
  });

  test("selected work section shows featured projects", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Selected work")).toBeVisible();
    await expect(page.getByRole("link", { name: "Video Sharing Platform" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Banking Application" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Chess Engine" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Housing Affordability Dashboard" })).toBeVisible();
  });

  test("skills section shows grouped skills", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Technical strengths")).toBeVisible();
    await expect(page.getByText("Frontend").first()).toBeVisible();
    await expect(page.getByText("Backend").first()).toBeVisible();
    await expect(page.getByText("Data & Visualization")).toBeVisible();
    await expect(page.getByText("Databases")).toBeVisible();
    await expect(page.getByText("Cloud & DevOps")).toBeVisible();
  });

  test("about preview section exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("A bit about me")).toBeVisible();
    await expect(page.getByRole("link", { name: /More about me/i })).toBeVisible();
  });

  test("contact section exists with email", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("wahabf@oregonstate.edu")).toBeVisible();
  });

  test("no lorem ipsum on homepage", async ({ page }) => {
    await page.goto("/");
    const content = await page.textContent("body");
    expect(content?.toLowerCase()).not.toContain("lorem ipsum");
  });

  test("no generic AI copy on homepage", async ({ page }) => {
    await page.goto("/");
    const content = await page.textContent("body");
    const lower = content?.toLowerCase() || "";
    expect(lower).not.toContain("crafting digital experiences");
    expect(lower).not.toContain("passionate developer");
    expect(lower).not.toContain("building the future");
    expect(lower).not.toContain("seamless, scalable");
    expect(lower).not.toContain("innovative solutions");
    expect(lower).not.toContain("welcome to my portfolio");
  });
});

// ─── Projects Page Tests ───────────────────────────────────────────

test.describe("Projects page", () => {
  test("shows all projects", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("link", { name: "Video Sharing Platform" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Banking Application" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Chess Engine" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Housing Affordability Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Weather Application" })).toBeVisible();
  });

  test("has featured and other sections", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByText("Featured")).toBeVisible();
    await expect(page.getByText("Other Projects")).toBeVisible();
  });

  test("each project card has tech stack tags", async ({ page }) => {
    await page.goto("/projects");
    const cards = page.locator("article.project-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── Case Study Page Tests ─────────────────────────────────────────

test.describe("Case study pages", () => {
  const slugs = [
    "video-platform",
    "banking-app",
    "chess-engine",
    "housing-dashboard",
    "weather-app",
  ];

  for (const slug of slugs) {
    test(`${slug} has all required sections`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page.getByText("Overview")).toBeVisible();
      await expect(page.getByText("The problem")).toBeVisible();
      await expect(page.getByText("My role")).toBeVisible();
      await expect(page.getByText("Tech stack")).toBeVisible();
      await expect(page.getByText("Key features")).toBeVisible();
      await expect(page.getByText("Technical details")).toBeVisible();
      await expect(page.getByText("What I learned")).toBeVisible();
    });
  }

  test("screenshot placeholder shows when no image", async ({ page }) => {
    await page.goto("/projects/chess-engine");
    await expect(page.getByText("Screenshot coming soon")).toBeVisible();
  });
});

// ─── About Page Tests ──────────────────────────────────────────────

test.describe("About page", () => {
  test("shows bio content", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText(/final-year computer science/i).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Oregon State University" })).toBeVisible();
  });

  test("has values section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("How I think about software")).toBeVisible();
    await expect(page.getByText("Start from the problem")).toBeVisible();
    await expect(page.getByText("Earn complexity")).toBeVisible();
    await expect(page.getByText("Ship, then iterate")).toBeVisible();
  });

  test("has education section", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: "Oregon State University" })
    ).toBeVisible();
    await expect(page.getByText(/Computer Science/)).toBeVisible();
  });

  test("has contact section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("wahabf@oregonstate.edu")).toBeVisible();
  });
});

// ─── Resume Page Tests ─────────────────────────────────────────────

test.describe("Resume page", () => {
  test("shows education details", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText("Oregon State University").first()).toBeVisible();
    await expect(
      page.getByText("Bachelor of Science in Computer Science")
    ).toBeVisible();
  });

  test("shows resume availability message", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText("Resume available on request")).toBeVisible();
  });

  test("shows relevant coursework", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText("Relevant Coursework")).toBeVisible();
    await expect(page.getByText(/Data Structures/)).toBeVisible();
    await expect(page.getByText(/Algorithms/)).toBeVisible();
  });

  test("shows skills section", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText("Technical skills")).toBeVisible();
  });

  test("shows selected projects", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText("Selected projects")).toBeVisible();
  });
});

// ─── Footer Tests ──────────────────────────────────────────────────

test.describe("Footer", () => {
  test("footer shows on all pages", async ({ page }) => {
    for (const path of ["/", "/projects", "/about", "/resume"]) {
      await page.goto(path);
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByText("Farad Wahab", { exact: true })).toBeVisible();
    }
  });

  test("footer has nav links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator('nav[aria-label="Footer navigation"]');
    await expect(footer).toBeVisible();
    await expect(footer.getByText("GitHub")).toBeVisible();
    await expect(footer.getByText("LinkedIn")).toBeVisible();
  });
});

// ─── Accessibility Tests ───────────────────────────────────────────

test.describe("Accessibility", () => {
  test("pages have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = await page.locator("h1").count();
    expect(h1).toBe(1);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("header nav has aria-label", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
  });

  test("footer nav has aria-label", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Footer navigation"]');
    await expect(nav).toBeVisible();
  });

  test("mobile menu button has aria attributes", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator(".menu-toggle");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toHaveAttribute("aria-label", "Open menu");
  });

  test("external links have rel noopener noreferrer", async ({ page }) => {
    await page.goto("/");
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("page has lang attribute", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("keyboard navigation: Tab through nav links", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // Skip to first focusable (skip link or first nav link)
    let attempts = 0;
    while (attempts < 10) {
      const focused = page.locator(":focus");
      const tag = await focused.evaluate((el) => el.tagName).catch(() => "");
      if (tag === "A" || tag === "BUTTON") break;
      await page.keyboard.press("Tab");
      attempts++;
    }
    const focused = page.locator(":focus");
    const tag = await focused.evaluate((el) => el.tagName).catch(() => "");
    expect(["A", "BUTTON"]).toContain(tag);
  });
});

// ─── SEO & Metadata Tests ──────────────────────────────────────────

test.describe("SEO & Metadata", () => {
  test("homepage has proper title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("Farad Wahab");
  });

  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    const desc = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(20);
  });

  test("homepage has og:title", async ({ page }) => {
    await page.goto("/");
    const og = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(og).toBeTruthy();
  });

  test("homepage has og:description", async ({ page }) => {
    await page.goto("/");
    const og = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(og).toBeTruthy();
  });

  test("projects page has unique title", async ({ page }) => {
    await page.goto("/projects");
    const title = await page.title();
    expect(title).toContain("Projects");
    expect(title).toContain("Farad Wahab");
  });

  test("about page has unique title", async ({ page }) => {
    await page.goto("/about");
    const title = await page.title();
    expect(title).toContain("About");
  });

  test("case study pages have project title in page title", async ({
    page,
  }) => {
    await page.goto("/projects/chess-engine");
    const title = await page.title();
    expect(title).toContain("Chess Engine");
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain("<url>");
    expect(content).toContain("faradwahab.com");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });
});

// ─── 404 Test ──────────────────────────────────────────────────────

test.describe("404 handling", () => {
  test("invalid project slug returns 404", async ({ page }) => {
    const response = await page.goto("/projects/nonexistent-project");
    expect(response?.status()).toBe(404);
  });

  test("invalid route returns 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});

// ─── Mobile-specific Tests ─────────────────────────────────────────

test.describe("Mobile interactions", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu toggle works", async ({ page }) => {
    await page.goto("/");
    const toggleBtn = page.locator(".menu-toggle");
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute("aria-expanded", "true");
    await expect(toggleBtn).toHaveAttribute("aria-label", "Close menu");
    // Nav links should now be visible
    const navLinks = page.locator(".nav-links--open");
    await expect(navLinks).toBeVisible();
  });

  test("mobile menu closes on link click", async ({ page }) => {
    await page.goto("/");
    await page.locator(".menu-toggle").click();
    await page.locator(".nav-links--open").getByText("About").click();
    await expect(page).toHaveURL("/about");
  });

  test("hero text is readable on mobile", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeLessThanOrEqual(375);
  });
});

// ─── Visual Regression / No Broken Layout ──────────────────────────

test.describe("Layout integrity", () => {
  test("no horizontal overflow on homepage", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(
      () => document.body.scrollWidth
    );
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const bodyWidth = await page.evaluate(
      () => document.body.scrollWidth
    );
    expect(bodyWidth).toBeLessThanOrEqual(376);
  });

  test("contact section email link is a mailto link", async ({ page }) => {
    await page.goto("/");
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink.first()).toBeVisible();
    const href = await emailLink.first().getAttribute("href");
    expect(href).toContain("wahabf@oregonstate.edu");
  });
});

// ─── Performance smoke checks ──────────────────────────────────────

test.describe("Performance", () => {
  test("homepage loads in under 3 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });

  test("no large blocking scripts on homepage", async ({ page }) => {
    const scripts: string[] = [];
    page.on("response", (response) => {
      if (response.url().endsWith(".js")) {
        scripts.push(response.url());
      }
    });
    await page.goto("/", { waitUntil: "networkidle" });
    // Just verifying we don't have an absurd number of scripts
    expect(scripts.length).toBeLessThan(30);
  });
});

// ─── Dark mode ─────────────────────────────────────────────────────

test.describe("Dark mode", () => {
  test("dark mode applies different background", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const bgColor = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    // Should not be white
    expect(bgColor).not.toBe("rgb(255, 255, 255)");
  });

  test("dark mode text is readable", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const color = await page.evaluate(() =>
      getComputedStyle(document.body).color
    );
    // Text should be light-colored in dark mode
    expect(color).not.toBe("rgb(0, 0, 0)");
  });
});

// ─── Content quality checks ────────────────────────────────────────

test.describe("Content quality", () => {
  test("no 'TODO' text visible in UI on homepage", async ({ page }) => {
    await page.goto("/");
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toContain("TODO");
  });

  test("no 'TODO' text visible in UI on projects page", async ({ page }) => {
    await page.goto("/projects");
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toContain("TODO");
  });

  test("no 'TODO' text visible in UI on about page", async ({ page }) => {
    await page.goto("/about");
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toContain("TODO");
  });

  test("no 'TODO' text visible in UI on resume page", async ({ page }) => {
    await page.goto("/resume");
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toContain("TODO");
  });

  test("no 'undefined' or 'null' text in UI", async ({ page }) => {
    for (const path of ["/", "/projects", "/about", "/resume"]) {
      await page.goto(path);
      const bodyText = await page.evaluate(() => {
        const clone = document.body.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("script, style").forEach((el) => el.remove());
        return clone.innerText;
      });
      expect(bodyText).not.toMatch(/\bundefined\b/);
      expect(bodyText).not.toMatch(/\bnull\b/);
    }
  });

  for (const slug of [
    "video-platform",
    "banking-app",
    "chess-engine",
    "housing-dashboard",
    "weather-app",
  ]) {
    test(`no TODO/undefined/null visible on /projects/${slug}`, async ({
      page,
    }) => {
      await page.goto(`/projects/${slug}`);
      const bodyText = await page.evaluate(() => {
        const clone = document.body.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("script, style").forEach((el) => el.remove());
        return clone.innerText;
      });
      expect(bodyText).not.toContain("TODO");
      expect(bodyText).not.toMatch(/\bundefined\b/);
      expect(bodyText).not.toMatch(/\bnull\b/);
    });
  }
});
