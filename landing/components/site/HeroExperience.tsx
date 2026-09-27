"use client";

import { useEffect, useState } from "react";

const heroPhrases = [
  "a quiet beginning",
  "a faithful pause",
  "a word for the way",
  "room to hear again",
];

const readings = [
  {
    reference: "Matthew 4:4",
    title: "Enough for today.",
    quote: "The Word meets the hunger beneath the hurry.",
    detail: "Begin with what is in front of you. Grace is not asking you to carry tomorrow yet.",
  },
  {
    reference: "Psalm 46:10",
    title: "Be still and know.",
    quote: "A quiet center for a full day.",
    detail: "Before the notifications, there is a place to listen. Stay there for one honest minute.",
  },
  {
    reference: "Proverbs 3:5–6",
    title: "Take the next step.",
    quote: "You do not have to see the whole road to begin.",
    detail: "Trust can look small: a prayer, a breath, a choice to keep walking in the light.",
  },
  {
    reference: "Lamentations 3:22–23",
    title: "Mercy for the morning.",
    quote: "New every day, given without performance.",
    detail: "Receive this morning as a gift, not a test. There is room to begin again.",
  },
];

export default function HeroExperience() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const phrase = heroPhrases[phraseIndex];
    const finished = typed === phrase;
    const cleared = typed.length === 0 && deleting;
    const delay = finished ? 1750 : cleared ? 460 : deleting ? 36 : 72;
    const timer = window.setTimeout(() => {
      if (finished) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % heroPhrases.length);
      } else {
        setTyped((current) => deleting ? phrase.slice(0, current.length - 1) : phrase.slice(0, current.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, typed]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % readings.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const reading = readings[activeIndex];

  return (
    <>
      <p className="eyebrow text-brand-rust">A daily practice of faith</p>
      <h1 className="font-display mt-6 max-w-2xl min-w-0 break-words text-[clamp(2.6rem,12vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-brand-teal md:text-7xl">
        Make room for <span className="text-brand-rust">{typed}</span><span className="typing-caret" aria-hidden="true" />
      </h1>
      <p className="mt-7 max-w-xl break-words text-base leading-7 text-brand-ink/70 sm:text-lg sm:leading-8 md:text-xl">
        Daily Bread is a quiet scripture-centered note for the beginning of your day—made to help you pause, listen, and walk with God into whatever comes next.
      </p>
      <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <a href="#signup" className="inline-flex w-full items-center justify-center rounded bg-brand-rust px-5 py-3.5 font-display text-sm font-bold text-white transition hover:bg-[#5c0d0b] sm:w-auto sm:px-6">
          Join Daily Bread
        </a>
        <a href="#rhythm" className="inline-flex w-full items-center justify-center gap-2 px-2 py-3 font-meta text-xs uppercase tracking-[0.1em] text-brand-teal/70 transition hover:text-brand-rust sm:w-auto sm:justify-start sm:tracking-[0.12em]">
          See the rhythm <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-brand-ink/10 pt-5 font-meta text-[11px] uppercase tracking-[0.12em] text-brand-ink/50">
        <span>Scripture</span>
        <span>Reflection</span>
        <span>Prayer</span>
        <span>Delivered daily</span>
      </div>
    </>
  );
}

export function HeroReadingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % readings.length), 4600);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-[470px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute -inset-4 rounded-lg border border-brand-rust/10" />
      <div className="hero-reading-card relative min-w-0 overflow-hidden rounded-lg bg-white p-5 shadow-ambient md:p-7" aria-live="polite">
        <div className="flex items-center justify-between border-b border-brand-ink/10 pb-5">
          <div className="flex items-center gap-3">
            <img src="/dailybread-lockup.png" alt="Daily Bread" className="h-10 w-auto max-w-[180px] object-contain" />
            <p className="font-meta hidden text-[10px] uppercase tracking-[0.12em] text-brand-ink/45 sm:block">Today&apos;s reading</p>
          </div>
          <span className="font-meta text-[10px] text-brand-rust">07:00</span>
        </div>
        <div className="hero-reading-viewport overflow-hidden">
          <div className="hero-reading-track flex" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {readings.map((item) => (
              <article key={item.reference} className="min-w-full min-h-[350px] px-1 py-8 sm:min-h-[390px] sm:py-10 md:px-5 md:py-12" aria-hidden={item.reference !== readings[activeIndex].reference}>
                <p className="eyebrow text-brand-rust">{item.reference}</p>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-brand-teal md:text-4xl">{item.title}</h2>
                <blockquote className="mt-5 break-words border-l-2 border-brand-rust/45 pl-4 text-base italic leading-7 text-brand-ink/75 sm:text-lg sm:leading-8">“{item.quote}”</blockquote>
                <p className="mt-6 max-w-sm break-words text-sm leading-7 text-brand-ink/65">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-brand-ink/10 pt-5">
          <div className="flex items-center gap-1.5" aria-label={`Reading ${activeIndex + 1} of ${readings.length}`}>
            {readings.map((item, index) => (
              <button key={item.reference} type="button" aria-label={`Show ${item.title}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-brand-rust" : "w-1.5 bg-brand-ink/20 hover:bg-brand-rust/50"}`} />
            ))}
          </div>
          <span className="hidden max-w-[11rem] text-right font-meta text-[10px] uppercase tracking-[0.1em] text-brand-ink/45 sm:block sm:tracking-[0.12em]">A note for the ordinary day</span>
        </div>
      </div>
    </div>
  );
}
