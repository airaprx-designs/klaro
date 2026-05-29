import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>We couldn&rsquo;t find what you were looking for.</p>
      <p className="mt-4">
        <Link href="/" className="underline underline-offset-4">
          ← Go home
        </Link>
      </p>
    </section>
  );
}
