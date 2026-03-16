"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="section-space">
      <div className="container-shell rounded-lg border border-slate-200 bg-white p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-bold text-primary">We couldn&apos;t load this page right now.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Please try again. If the issue continues, contact SGB Engineering &amp; Trading and we&apos;ll assist directly.
        </p>
        {error.digest ? <p className="mt-4 text-xs text-muted-foreground">Reference: {error.digest}</p> : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
