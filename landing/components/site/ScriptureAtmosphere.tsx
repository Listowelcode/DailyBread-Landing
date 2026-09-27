"use client";

import { useEffect, useState } from "react";

const verses = [
  "Be still, and know that I am God.",
  "Your word is a lamp to my feet.",
  "The Lord is near to the brokenhearted.",
  "He restores my soul.",
  "Let all that you do be done in love.",
  "My grace is sufficient for you.",
  "In returning and rest you shall be saved.",
  "The steadfast love of the Lord never ceases.",
];

const slots = [
  { top: "10%", left: "-2%", rotate: "-8deg", delay: "0ms" },
  { top: "27%", right: "-5%", rotate: "7deg", delay: "900ms" },
  { top: "56%", left: "7%", rotate: "-4deg", delay: "1400ms" },
  { top: "77%", right: "5%", rotate: "5deg", delay: "550ms" },
  { top: "43%", left: "42%", rotate: "-2deg", delay: "1900ms" },
];

export default function ScriptureAtmosphere() {
  const [active, setActive] = useState(() => slots.map((_, index) => index));

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => current.map((value, slotIndex) => (value + slotIndex + 1) % verses.length));
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="scripture-atmosphere" aria-hidden="true">
      {slots.map((slot, index) => (
        <span
          key={index}
          className="scripture-float"
          style={{
            top: slot.top,
            left: slot.left,
            right: slot.right,
            transform: `rotate(${slot.rotate})`,
            animationDelay: slot.delay,
          }}
        >
          {verses[active[index]]}
        </span>
      ))}
    </div>
  );
}
