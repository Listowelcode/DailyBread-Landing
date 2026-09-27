"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 900;
const FADE_MS = 500;
const SAFETY_MS = 3500;

/**
 * Renders directly in place (no portal, no client-only mount gate) so its
 * markup is part of the very first HTML paint — including the server-rendered
 * pass — and covers the header/logo before a single frame of the page beneath
 * it can appear. It only needs `position: fixed` to fill the viewport here
 * because it sits inside #top, which has no transform and always spans the
 * full document height, so it is never clipped at any scroll position.
 */
export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const start = Date.now();
    let done = false;

    function finish() {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(MIN_VISIBLE_MS - elapsed, 0);
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => {
          setHidden(true);
          body.style.overflow = previousOverflow;
        }, FADE_MS);
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Never block the page for more than a moment, even if something stalls.
    const safety = window.setTimeout(finish, SAFETY_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safety);
      body.style.overflow = previousOverflow;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader-screen fixed inset-0 z-[100] flex h-[100dvh] w-screen items-center justify-center bg-brand-surface ${fading ? "preloader-fade-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Daily Bread"
    >
      <div className="preloader-content flex flex-col items-center gap-7">
        <img src="/dailybread-lockup.png" alt="Daily Bread" className="h-9 w-auto sm:h-11" />
        <div className="preloader-dots flex items-center gap-2" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="font-meta text-[10px] uppercase tracking-[0.2em] text-brand-ink/45">Preparing a quiet moment</p>
      </div>
    </div>
  );
}
