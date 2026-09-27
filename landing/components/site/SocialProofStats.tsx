"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { target: 10000, suffix: "+", label: "Readers already subscribed" },
  { target: 2000, suffix: "+", label: "Emails sent out every day" },
];

const COUNT_DURATION_MS = 1700;

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.target, active);
  return (
    <div className="flex flex-col items-center text-center">
      <p className="stat-number font-display whitespace-nowrap text-[clamp(1.75rem,7vw,3rem)] font-extrabold leading-none tracking-[-0.03em] text-brand-teal">
        {count.toLocaleString()}
        <span className="text-brand-rust">{stat.suffix}</span>
      </p>
      <p className="mt-2.5 max-w-[9rem] font-meta text-[10px] uppercase leading-tight tracking-[0.1em] text-brand-ink/55 sm:max-w-none sm:text-[11px] sm:tracking-[0.12em]">{stat.label}</p>
    </div>
  );
}

export default function SocialProofStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden border-b border-brand-ink/10 bg-white/70"
      aria-label="Daily Bread community stats"
    >
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-6 px-5 py-9 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:py-10 md:px-8 lg:px-16">
        <div className="flex items-center justify-center gap-2.5 sm:justify-start">
          <span className="stat-pulse-dot" aria-hidden="true" />
          <p className="font-meta text-[11px] uppercase tracking-[0.14em] text-brand-teal/70">Growing every day</p>
        </div>

        <div className="flex items-stretch justify-center gap-6 sm:gap-14">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && <span className="w-px shrink-0 self-stretch bg-brand-ink/20" aria-hidden="true" />}
              <StatItem stat={stat} active={active} />
            </Fragment>
          ))}
        </div>

        <p className="mx-auto max-w-[230px] text-center text-xs leading-6 text-brand-ink/50 sm:text-right">
          New readers join Daily Bread every day — you&apos;d be in good company.
        </p>
      </div>
    </section>
  );
}
