import Link from "next/link";
import { siteConfig } from "@/content/site";
import NavLink from "@/components/NavLink";

export default function Header() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-6 pb-10 sm:pt-12 sm:pb-14">
      <Link href="/" className="font-serif text-lg font-semibold transition-colors duration-150 hover:text-accent">
        {siteConfig.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-4 text-small sm:gap-6">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
