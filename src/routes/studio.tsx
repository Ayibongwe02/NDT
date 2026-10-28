import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/studio")({ component: Studio });

function Studio() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Artist desk</h1>
      <p className="mt-1 mb-8 text-muted">
        Submit new work or track an existing review with {BRAND.name}
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-lg bg-surface p-7 shadow-[0_2px_12px_rgba(28,20,18,0.04)]">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary">
            SUBMIT
          </p>
          <h2 className="mt-1 mb-4 font-serif text-2xl">New work</h2>
          <ul className="mb-6 space-y-2 text-sm">
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Provide title, medium, dimensions
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Choose digital or physical review
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Optional collection — or let the classifier suggest
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Status updates in this desk
            </li>
          </ul>
          <Link
            to="/submit"
            className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-surface no-underline hover:bg-primary-dark"
          >
            Start submission
          </Link>
        </div>
        <div className="rounded-lg bg-surface p-7 shadow-[0_2px_12px_rgba(28,20,18,0.04)]">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary">
            TRACK
          </p>
          <h2 className="mt-1 mb-4 font-serif text-2xl">Current status</h2>
          <ul className="mb-6 space-y-2 text-sm">
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              View review progress
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              See curator decisions
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Get notified on publication
            </li>
            <li className="pl-4 before:mr-2 before:text-primary before:content-['→']">
              Access live works
            </li>
          </ul>
          <Link
            to="/status"
            className="inline-flex rounded-md border border-primary px-4 py-2.5 text-sm font-medium text-primary no-underline hover:bg-bg"
          >
            View status
          </Link>
        </div>
      </div>
    </main>
  );
}
