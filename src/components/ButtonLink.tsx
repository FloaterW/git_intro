const styles = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "border border-line text-ink hover:border-accent hover:text-accent",
};

export default function ButtonLink({
  href,
  variant = "secondary",
  external = false,
  download = false,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  external?: boolean;
  download?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-small sm:px-4 font-medium transition-colors duration-150 ${styles[variant]}`}
    >
      {children}
      {external && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
        </svg>
      )}
    </a>
  );
}
