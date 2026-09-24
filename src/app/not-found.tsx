import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-muted">
        There&apos;s nothing at this address.{" "}
        <Link href="/" className="text-link">
          Head back to the home page
        </Link>
        .
      </p>
    </>
  );
}
