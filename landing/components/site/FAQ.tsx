const faqs = [
  {
    question: "What is Daily Bread?",
    answer:
      "Daily Bread is a free daily email that includes a short Scripture passage, a brief reflection, and a short prayer — a quiet, ad-free way to begin your day with faith.",
  },
  {
    question: "How much does Daily Bread cost?",
    answer: "Daily Bread is completely free. There is no paid tier and no app to download.",
  },
  {
    question: "How often will I receive emails?",
    answer:
      "Daily Bread arrives once a day by default. You can adjust frequency and preferences at any time from your personal profile link.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required. You only need to provide your name and email address to start receiving Daily Bread.",
  },
  {
    question: "Can I unsubscribe at any time?",
    answer:
      "Yes. Every email includes a link to your profile, where you can update your preferences or unsubscribe instantly.",
  },
  {
    question: "What is a Daily Bread Spiritual Journey?",
    answer:
      "Spiritual Journeys are optional multi-day email series that walk through a specific theme or topic one short lesson at a time, in addition to the regular daily note.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="reveal relative mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28 lg:px-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-2xl">
        <p className="eyebrow text-brand-rust">Questions</p>
        <h2 className="font-display mt-5 text-3xl font-bold leading-tight tracking-[-0.03em] text-brand-teal md:text-4xl">
          A few things people ask.
        </h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-t-2 border-brand-rust/60 bg-white/60 p-5 md:p-6">
            <h3 className="font-display text-lg font-bold text-brand-teal">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-ink/65">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
