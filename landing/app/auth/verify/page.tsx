"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifySubscriberMagicLink } from "@/lib/api";

const TOKEN_KEY = "dailybread_subscriber_magic_token";

function VerifyMagicLink() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Opening your private Daily Bread space…");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("This profile link is missing its private token.");
      return;
    }

    verifySubscriberMagicLink(token)
      .then(() => {
        window.localStorage.setItem(TOKEN_KEY, token);
        window.location.replace("/profile");
      })
      .catch((error) => {
        setMessage(error instanceof Error ? error.message : "This profile link is invalid or expired.");
      });
  }, [searchParams]);

  return (
    <main className="portal-page portal-loading portal-verify-page">
      <div className="portal-orb portal-orb-one" />
      <div className="portal-loading-mark"><img src="/dailybread-icon-transparent.png" alt="Daily Bread" /></div>
      <p className="eyebrow">Private subscriber access</p>
      <h1 className="font-display">{message}</h1>
      <div className="portal-loading-line" />
      <a className="portal-text-button" href="/">Return to Daily Bread</a>
    </main>
  );
}

export default function VerifyPage() {
  return <Suspense fallback={<main className="portal-page portal-loading"><div className="portal-loading-mark"><img src="/dailybread-icon-transparent.png" alt="Daily Bread" /></div><p className="eyebrow">Preparing your private link…</p></main>}><VerifyMagicLink /></Suspense>;
}
