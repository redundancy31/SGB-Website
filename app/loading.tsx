export default function Loading() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-slate-200" />
            <div className="h-16 w-4/5 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-6 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="h-[420px] animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
