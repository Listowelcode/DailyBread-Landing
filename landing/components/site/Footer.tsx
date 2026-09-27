export default function Footer() {
  return (
    <footer className="border-t border-brand-ink/10 bg-brand-teal text-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-12 lg:px-16">
        <div className="max-w-md">
          <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-white">Daily Bread<span className="text-brand-rust">.</span></p>
          <p className="mt-3 text-sm leading-7 text-white/60">A quiet scripture-centered note for the beginning of your day.</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a href="#top" className="font-meta text-[10px] uppercase tracking-[0.14em] text-white/65 transition hover:text-white">Back to the beginning ↑</a>
          <p className="font-meta text-[10px] uppercase tracking-[0.12em] text-white/35">A daily pause for what is true · © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
