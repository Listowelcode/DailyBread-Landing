export default function PageSkeleton() {
  return (
    <div className="landing-skeleton-screen min-h-screen bg-brand-surface p-5 text-brand-ink md:p-8" role="status" aria-label="Loading Daily Bread">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="landing-skeleton-block h-11 w-36 rounded-xl" />
        <div className="hidden gap-3 sm:flex"><div className="landing-skeleton-block h-9 w-20 rounded-full" /><div className="landing-skeleton-block h-9 w-28 rounded-full" /></div>
      </header>
      <main className="mx-auto max-w-6xl py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <section className="space-y-6">
            <div className="landing-skeleton-block h-3 w-32 rounded-full" />
            <div className="space-y-3"><div className="landing-skeleton-block h-14 w-full max-w-xl rounded-2xl" /><div className="landing-skeleton-block h-14 w-10/12 rounded-2xl" /></div>
            <div className="landing-skeleton-block h-5 w-full max-w-lg rounded-full" />
            <div className="landing-skeleton-block h-5 w-8/12 rounded-full" />
            <div className="landing-skeleton-block mt-5 h-14 w-40 rounded-full" />
          </section>
          <section className="landing-skeleton-block min-h-[360px] rounded-[2rem] p-6">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4"><div className="landing-skeleton-block h-3 w-28 rounded-full" /><div className="landing-skeleton-block h-10 w-9/12 rounded-xl" /><div className="landing-skeleton-block h-24 w-full rounded-2xl" /></div>
              <div className="grid gap-3 sm:grid-cols-2"><div className="landing-skeleton-block h-24 rounded-2xl" /><div className="landing-skeleton-block h-24 rounded-2xl" /></div>
            </div>
          </section>
        </div>
        <section className="mt-16 grid gap-4 md:grid-cols-3"><div className="landing-skeleton-block h-32 rounded-2xl" /><div className="landing-skeleton-block h-32 rounded-2xl" /><div className="landing-skeleton-block h-32 rounded-2xl" /></section>
      </main>
      <span className="sr-only">Loading Daily Bread…</span>
    </div>
  );
}
