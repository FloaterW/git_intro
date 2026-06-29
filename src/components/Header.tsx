"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { cx } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <nav className="container" aria-label="Main navigation">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
            aria-label={`${siteConfig.name} — Home`}
          >
            {siteConfig.name}
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xl)",
            }}
          >
            <ul
              className={cx("nav-links", menuOpen && "nav-links--open")}
              role="list"
            >
              {siteConfig.navLinks.map((link) => {
                const href = link.href as string;
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : !href.startsWith("#") && pathname.startsWith(href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cx("nav-link", isActive && "nav-link--active")}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-link-github-mobile">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  aria-label="GitHub profile"
                  onClick={() => setMenuOpen(false)}
                >
                  GitHub
                </a>
              </li>
            </ul>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link-desktop"
              aria-label="GitHub profile"
              style={{
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .nav-links {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link-github-mobile {
          display: block;
        }

        .github-link-desktop {
          display: none;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-xs);
          color: var(--color-text);
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
            gap: var(--space-lg);
            align-items: center;
          }

          .nav-link-github-mobile {
            display: none;
          }

          .github-link-desktop {
            display: flex !important;
          }

          .menu-toggle {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .nav-links--open {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 4rem;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--color-bg);
            padding: var(--space-xl) var(--space-lg);
            gap: var(--space-xs);
            z-index: 40;
          }
        }

        .nav-link {
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
          transition: color 0.15s;
          padding: var(--space-sm) 0;
          display: block;
        }

        .nav-link:hover {
          color: var(--color-text);
        }

        .nav-link--active {
          color: var(--color-text);
          font-weight: 500;
        }

        @media (max-width: 767px) {
          .nav-link {
            font-size: 1.125rem;
            padding: var(--space-md) 0;
            border-bottom: 1px solid var(--color-border);
          }
        }
      `}</style>
    </header>
  );
}
