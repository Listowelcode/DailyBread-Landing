export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/10 bg-brand-surface/85 backdrop-blur-xl transition-colors duration-500">
      <div className="mx-auto flex min-w-0 max-w-[1200px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8 lg:px-16">
        <a href="#top" className="group flex min-w-0 items-center" aria-label="Daily Bread home">
          <img src="/dailybread-lockup.png" alt="Daily Bread" className="h-9 w-auto max-w-[52vw] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-10 md:h-12" />
        </a>
        <a href="#signup" className="shrink-0 whitespace-nowrap font-meta text-[10px] font-medium uppercase tracking-[0.08em] text-brand-teal/70 transition-colors duration-300 hover:text-brand-rust sm:text-[11px] sm:tracking-[0.12em]">
          Begin the practice
        </a>
      </div>
    </header>
  );
}
