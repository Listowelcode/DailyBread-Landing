import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SignupForm from "@/components/site/SignupForm";
import ScrollEffects from "@/components/site/ScrollEffects";
import HeroExperience, { HeroReadingCarousel } from "@/components/site/HeroExperience";
import ScriptureAtmosphere from "@/components/site/ScriptureAtmosphere";
import SocialProofStats from "@/components/site/SocialProofStats";
import FAQ from "@/components/site/FAQ";

const practices = [
  {
    number: "01",
    title: "Receive the Word",
    body: "A carefully chosen passage to meet you before the noise of the day begins.",
  },
  {
    number: "02",
    title: "Stay with it",
    body: "A short reflection that brings ancient wisdom into the ordinary shape of your life.",
  },
  {
    number: "03",
    title: "Carry it forward",
    body: "A simple prayer or question to keep the day open to grace, courage, and attention.",
  },
];

export default function LandingPage() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-brand-surface text-brand-ink">
      <ScrollEffects />
      <ScriptureAtmosphere />
      <Header />

      <main>
        <section className="relative border-b border-brand-ink/10">
          <div className="landing-slate-blob landing-slate-blob-hero-one" aria-hidden="true" />
          <div className="landing-slate-blob landing-slate-blob-hero-two" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-rust/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-32">
            <div className="reveal max-w-2xl">
              <HeroExperience />
            </div>

            <div className="reveal reveal-delay-2 parallax">
              <HeroReadingCarousel />
            </div>
          </div>
        </section>

        <SocialProofStats />

        <section id="rhythm" className="reveal relative mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28 lg:px-16">
          <div className="landing-slate-blob landing-slate-blob-rhythm" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow text-brand-rust">The daily rhythm</p>
              <h2 className="font-display mt-5 max-w-md text-3xl font-bold leading-tight tracking-[-0.03em] text-brand-teal md:text-4xl">Small enough for every day. Deep enough to stay with you.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {practices.map((practice) => (
                <article key={practice.number} className="border-t-2 border-brand-rust/60 bg-white/60 p-5 md:p-6">
                  <p className="font-meta text-xs text-brand-rust">{practice.number}</p>
                  <h3 className="font-display mt-10 text-xl font-bold text-brand-teal">{practice.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-ink/65">{practice.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal relative overflow-hidden border-y border-brand-ink/10 bg-[#e8efed] px-5 py-20 md:px-8 md:py-28 lg:px-16">
          <div className="landing-slate-blob landing-slate-blob-gallery" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow text-brand-rust">A visual pause</p>
                <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-brand-teal md:text-4xl">Make room for the quiet things.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-brand-ink/60">A little beauty can help us notice what is already here: breath, light, Scripture, and the next faithful step.</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <figure className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-brand-teal shadow-[0_20px_50px_rgba(11,55,59,0.14)] md:min-h-[480px]">
                <img src="/quiet-scripture-dawn.jpg" alt="An open Bible and warm cup of coffee on a table in early morning light" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/85 via-brand-teal/5 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8"><p className="font-meta text-[10px] uppercase tracking-[0.16em] text-white/60">Begin gently</p><p className="font-display mt-2 max-w-sm text-2xl font-bold leading-tight">Let the first word meet you where you are.</p></figcaption>
              </figure>
              <figure className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-brand-rust shadow-[0_20px_50px_rgba(118,18,10,0.14)] md:min-h-[480px]">
                <img src="/quiet-walk-reflection.jpg" alt="A person walking along a sunlit path through tall grasses" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-rust/80 via-brand-rust/5 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8"><p className="font-meta text-[10px] uppercase tracking-[0.16em] text-white/65">Carry it forward</p><p className="font-display mt-2 max-w-xs text-2xl font-bold leading-tight">Walk into the day with a little more light.</p></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="reveal relative overflow-hidden border-y border-brand-ink/10 bg-brand-teal text-white">
          <div className="landing-slate-blob landing-slate-blob-dark" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-16">
            <div className="flex flex-col items-start gap-5">
              <div>
                <p className="eyebrow text-white/55">A grounded beginning</p>
                <p className="font-display mt-4 text-2xl font-bold leading-tight text-white">The day does not have to start with hurry.</p>
              </div>
            </div>
            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-white/75 md:text-xl">Daily Bread is for the person who wants a faithful rhythm without another demanding app. No feed to keep up with. No performance to maintain. Just a few honest minutes with Scripture, reflection, and prayer.</p>
              <p className="mt-6 font-meta text-[11px] uppercase tracking-[0.12em] text-white/45">Come as you are. Begin again tomorrow.</p>
            </div>
          </div>
        </section>

        <section id="signup" className="reveal relative mx-auto grid max-w-[1200px] items-center gap-12 overflow-hidden px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_0.8fr] lg:px-16">
          <div className="landing-slate-blob landing-slate-blob-signup" aria-hidden="true" />
          <div className="max-w-xl">
            <p className="eyebrow text-brand-rust">Your invitation</p>
            <h2 className="font-display mt-5 text-4xl font-extrabold leading-tight tracking-[-0.04em] text-brand-teal md:text-5xl">Take a little bread for the road.</h2>
            <p className="mt-6 text-lg leading-8 text-brand-ink/70">Enter your name and email to receive a brief, thoughtful Daily Bread note in your inbox. A quiet place to return to, one day at a time.</p>
            <div className="mt-8 flex items-center gap-3 font-meta text-[10px] uppercase tracking-[0.12em] text-brand-ink/45"><span className="h-px w-10 bg-brand-rust/50" /> No account. No noise. Just the next faithful step.</div>
          </div>
          <SignupForm />
        </section>

        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
