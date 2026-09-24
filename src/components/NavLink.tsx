"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const base = "transition-colors duration-150";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();

  if (href.startsWith("#")) {
    return (
      <a href={href} className={`${base} text-muted hover:text-ink`}>
        {children}
      </a>
    );
  }

  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${
        active ? "text-ink underline decoration-accent underline-offset-6" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
