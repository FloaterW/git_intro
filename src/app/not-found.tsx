import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl">
      <h1 className="heading-1">Page not found</h1>
      <p className="mt-4 prose-body">
        There&apos;s nothing at this address.{" "}
        <Link href="/" className="text-link">
          Head back to the home page
        </Link>
        .
      </p>
    </div>
  );
}
