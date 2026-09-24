"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pt-10 pb-14 sm:pt-14">
      <Link href="/" className="font-serif text-lg font-semibold">
        {siteConfig.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-5 text-[15px]">
          {siteConfig.navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#");
            const active = !isAnchor && pathname.startsWith(link.href);
            const className = active
              ? "text-ink underline decoration-accent underline-offset-[6px]"
              : "text-muted hover:text-ink";
            return (
              <li key={link.href}>
                {isAnchor ? (
                  <a href={link.href} className={className}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={className}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
