import Link from "next/link";
import { siteConfig } from "@/content/site";
import NavLink from "@/components/NavLink";

const linkStyle = "text-muted transition-colors duration-150 hover:text-ink";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 sm:px-8 sm:py-0">
        <Link
          href="/"
          className="font-serif text-base font-semibold whitespace-nowrap transition-colors duration-150 hover:text-accent sm:text-lg"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-3.5 text-sm sm:gap-6 sm:text-small">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a href={link.href} className={linkStyle}>
                    {link.label}
                  </a>
                ) : (
                  <NavLink href={link.href} className={linkStyle}>
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
