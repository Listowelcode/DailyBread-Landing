"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button";
import { ApiRequestError, subscribe } from "@/lib/api";
import { DEFAULT_TIMEZONE, getTimezoneOptions } from "@/lib/timezones";

// Some ancestor sections (e.g. the ".reveal" scroll-in animation) apply a
// CSS transform, which creates a new containing block for `position: fixed`
// descendants. That makes a "full page" overlay render relative to that
// section instead of the real viewport. Rendering the overlay through a
// portal straight into <body> sidesteps that and guarantees it always
// covers and centers on the whole page.
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

type Status = "idle" | "loading" | "success" | "error";

function LoadingOverlay() {
  return (
    <div className="signup-overlay fixed inset-0 z-[80] flex h-[100dvh] w-full items-center justify-center overflow-y-auto bg-brand-teal/35 p-4 backdrop-blur-[5px] sm:p-5" role="status" aria-live="polite" aria-label="Joining">
      <div className="signup-overlay-card my-auto w-full max-w-sm rounded-2xl border border-white/60 bg-white/95 p-6 text-center shadow-ambient sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface-low text-brand-teal">
          <svg className="signup-spinner h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 7.5V16l8 5 8-5V7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 7.5 12 3l8 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="eyebrow mt-6 text-brand-rust">One quiet moment</p>
        <h2 className="font-display mt-2 text-2xl font-bold text-brand-teal">Joining...</h2>
        <p className="mt-3 text-sm leading-6 text-brand-ink/60">Setting up your Daily Bread experience.</p>
      </div>
    </div>
  );
}

function SuccessModal({ firstName, onClose }: { firstName: string; onClose: () => void }) {
  return (
    <div className="signup-overlay fixed inset-0 z-[80] flex h-[100dvh] w-full items-center justify-center overflow-y-auto bg-brand-teal/45 p-4 backdrop-blur-[6px] sm:p-5" role="presentation" onClick={onClose}>
      <div className="signup-success-card my-auto w-full max-w-lg rounded-2xl border border-brand-teal/10 bg-white p-6 shadow-ambient sm:p-7 md:p-10" role="dialog" aria-modal="true" aria-labelledby="signup-success-title" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-5">
          <div className="signup-checkmark flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-teal text-2xl font-bold text-white" aria-hidden="true">✓</div>
          <button type="button" onClick={onClose} className="font-meta text-[11px] uppercase tracking-[0.12em] text-brand-ink/45 transition hover:text-brand-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30" aria-label="Close confirmation">Close</button>
        </div>
        <p className="eyebrow mt-7 text-brand-rust">A new rhythm begins</p>
        <h2 id="signup-success-title" className="font-display mt-3 text-3xl font-bold leading-tight text-brand-teal">Welcome, {firstName}.</h2>
        <p className="mt-4 text-sm leading-7 text-brand-ink/70">You&apos;re now part of Daily Bread—a small, steady place for Scripture, reflection, and prayer in the middle of your day.</p>
        <div className="mt-6 space-y-3 rounded-xl bg-brand-surface px-5 py-4 text-sm leading-6 text-brand-ink/65">
          <p><strong className="text-brand-teal">Your welcome email is on its way.</strong> Check your inbox shortly for a first note and a simple introduction to the rhythm.</p>
          <p>Each message is designed to take only a few quiet minutes. No account, password, or extra noise is required.</p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={onClose} className="rounded bg-brand-teal px-5 py-3 font-meta text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30 active:translate-y-0">Begin quietly</button>
          <button type="button" onClick={onClose} className="rounded border border-brand-ink/15 px-5 py-3 font-meta text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-teal transition hover:border-brand-teal/35 hover:bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successName, setSuccessName] = useState("");
  const mounted = useMounted();
  const timezoneOptions = useMemo(() => getTimezoneOptions(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      await subscribe({ full_name: fullName, email, timezone });
      const firstName = fullName.trim().split(/\s+/)[0] || "friend";
      setSuccessName(firstName);
      setFullName("");
      setEmail("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof ApiRequestError ? err.message : "We could not save your details. Please try again.");
    }
  }

  function closeSuccess() {
    setStatus("idle");
    setSuccessName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative min-w-0 overflow-hidden rounded-lg border border-brand-ink/10 bg-white p-5 shadow-ambient sm:p-7 md:p-9" aria-busy={status === "loading"}>
        <img src="/dailybread-signup-mark.png" alt="" aria-hidden="true" className="signup-form-mark pointer-events-none absolute right-[-4.5rem] top-1/2 z-0 h-44 w-44 -translate-y-1/2 object-contain opacity-[0.075] sm:right-[-3.5rem] sm:h-56 sm:w-56 md:h-72 md:w-72" />
        <div className="relative z-10">
        <div className="border-b border-brand-ink/10 pb-6">
          <p className="eyebrow text-brand-rust">Start here</p>
          <h2 className="font-display mt-3 text-2xl font-bold text-brand-teal">A little room for grace.</h2>
          <p className="mt-3 text-sm leading-7 text-brand-ink/60">Leave your name and email. No account, password, or noise required.</p>
        </div>
        <div className="space-y-5 pt-7">
          <label className="block space-y-2">
            <span className="font-meta text-[11px] uppercase tracking-[0.1em] text-brand-ink/60">Your name</span>
            <input required minLength={2} type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Jane Doe" disabled={status === "loading"} className="min-w-0 w-full rounded border border-brand-ink/15 bg-brand-surface px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-ink/35 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 disabled:cursor-wait disabled:opacity-60" />
          </label>
          <label className="block space-y-2">
            <span className="font-meta text-[11px] uppercase tracking-[0.1em] text-brand-ink/60">Email address</span>
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="jane@example.com" disabled={status === "loading"} className="min-w-0 w-full rounded border border-brand-ink/15 bg-brand-surface px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-ink/35 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 disabled:cursor-wait disabled:opacity-60" />
          </label>
          <label className="block space-y-2">
            <span className="font-meta text-[11px] uppercase tracking-[0.1em] text-brand-ink/60">Timezone</span>
            <select required value={timezone} onChange={(event) => setTimezone(event.target.value)} disabled={status === "loading"} aria-label="Timezone for your Daily Bread emails" className="signup-timezone-select min-w-0 w-full appearance-none rounded border border-brand-ink/15 bg-brand-surface bg-no-repeat px-4 py-3 pr-10 text-sm text-brand-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 disabled:cursor-wait disabled:opacity-60">
              {timezoneOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <span className="block text-xs leading-5 text-brand-ink/45">Your Daily Bread messages will arrive at your chosen delivery time in this timezone.</span>
          </label>
        </div>
        {status === "error" && error && <p className="mt-4 text-sm leading-6 text-brand-rust" role="alert">{error}</p>}
        <Button type="submit" disabled={status === "loading"} className="mt-7 w-full rounded py-3.5">{status === "loading" ? "Joining..." : "Join Daily Bread"}</Button>
        <p className="mt-4 text-center text-xs leading-5 text-brand-ink/45">You can unsubscribe at any time. We&apos;ll only use your email for Daily Bread.</p>
        </div>
      </form>
      {mounted && status === "loading" && createPortal(<LoadingOverlay />, document.body)}
      {mounted && status === "success" &&
        createPortal(<SuccessModal firstName={successName} onClose={closeSuccess} />, document.body)}
    </>
  );
}
