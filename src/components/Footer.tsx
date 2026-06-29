import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "var(--space-xl)",
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "var(--space-xs)",
                }}
              >
                {siteConfig.name}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                CS Senior · Oregon State University
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <ul
                role="list"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-lg)",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        transition: "color 0.15s",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
