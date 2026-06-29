import Link from "next/link";
import { cx } from "@/lib/utils";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  children: React.ReactNode;
}

export default function Button({
  href,
  variant = "primary",
  external = false,
  children,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const styles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-sm)",
    padding: "0.625rem 1.25rem",
    fontSize: "0.9375rem",
    fontWeight: 500,
    borderRadius: "var(--radius-md)",
    transition: "all 0.15s",
    border: isPrimary ? "none" : "1px solid var(--color-border-strong)",
    backgroundColor: isPrimary ? "var(--color-text)" : "transparent",
    color: isPrimary ? "var(--color-bg)" : "var(--color-text)",
  };

  const className = cx(
    "btn",
    isPrimary ? "btn-primary" : "btn-secondary"
  );

  if (external) {
    return (
      <>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={styles}
          className={className}
        >
          {children}
        </a>
        <ButtonHoverStyles />
      </>
    );
  }

  return (
    <>
      <Link href={href} style={styles} className={className}>
        {children}
      </Link>
      <ButtonHoverStyles />
    </>
  );
}

function ButtonHoverStyles() {
  return (
    <style>{`
      .btn-primary:hover {
        opacity: 0.85;
      }
      .btn-secondary:hover {
        background-color: var(--color-bg-alt) !important;
      }
    `}</style>
  );
}
