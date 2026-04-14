import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";

const Hero = dynamic(() => import("@/components/Hero").then((m) => m.Hero));

export const metadata: Metadata = {
  title: "Referee | Research-integrity infrastructure for scholarly publishing",
  description:
    "Referee is research-integrity infrastructure for high-volume scholarly publishing, turning technical evidence into transparent, machine-readable reliability scores for structured triage.",
};

export default function Home() {
  return (
    <div className="py-6 md:py-10">
      <Hero />

      <section id="problem" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">The problem</h2>
        <p className="max-w-4xl text-foreground-secondary">
          Submission volume keeps rising across conferences, journals, and publisher workflows, but intake review capacity does not scale at the same pace. Most teams still depend on fragmented checks and manual triage, which creates bottlenecks and inconsistent screening quality.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">High volume, limited intake capacity</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Organizers cannot fully review every submission at intake, so weak papers and high-priority papers are often mixed together too late.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Fragmented integrity checks</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Current tools typically solve one check at a time, leaving teams without a unified view of what has been evaluated and what remains open.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Low auditability</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Traditional peer review was not designed for today&apos;s scale or threat models, and its outputs are hard to audit in structured, reusable form.
            </p>
          </article>
        </div>
      </section>

      <section id="solution" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">The solution</h2>
        <p className="max-w-4xl text-foreground-secondary">
          Referee is infrastructure for structured research screening and triage. We do not deliver a black-box score and we do not replace expert review. Instead, Referee organizes screening signals into a structured evaluation record that maps reliability signals to explicit flaw categories and unresolved checks.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Transparent reliability scoring</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Reliability scores are machine-readable outputs tied to concrete evidence. Each score can be inspected through supporting flaw categories and open questions that still need human judgment.
            </p>
          </article>
          <article className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
            <h3 className="text-lg font-semibold text-foreground">Current demo scope</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              A live dashboard and paper-checking workflow are available for walkthroughs today. The platform is early: coverage breadth and false-positive handling are still being improved.
            </p>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="mt-12 md:mt-16 space-y-6 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">How it works</h2>
        <p className="max-w-4xl text-foreground-secondary">
          Our proprietary Common Research Weakness Enumeration (CRWE) is the core framework behind Referee&apos;s workflow.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-base font-semibold text-foreground">1. Ingest paper evidence</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Referee analyzes scientific and technical evidence from submission materials and creates a structured screening context.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-base font-semibold text-foreground">2. Map checks to CRWE categories</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Screening checks are mapped to explicit flaw classes so teams can see where the paper appears weak and where evidence is incomplete.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-base font-semibold text-foreground">3. Record checked vs unresolved items</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              The system logs what has been checked, what remains unresolved, and which items require expert judgment before final decisions.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-base font-semibold text-foreground">4. Produce reliability signals for triage</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Outputs become machine-readable reliability signals that support intake triage and targeted human review, not autonomous acceptance or rejection.
            </p>
          </article>
        </div>

        <div className="mt-2 rounded-xl border border-border bg-card-bg p-4 sm:p-5">
          <Image
            src="/Review-model.png"
            alt="Referee workflow from evidence checks to structured evaluation output"
            width={1200}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          <p className="mt-3 text-sm text-foreground-muted">
            Workflow direction: the demo already shows dashboard and paper-checking foundations, while broader coverage is still in progress.
          </p>
        </div>
      </section>

      <section id="why-it-matters" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Why it matters</h2>
        <p className="max-w-4xl text-foreground-secondary">
          Referee helps teams triage faster, use expert time more effectively, and maintain clear records of research risk without making claims that correctness can be fully automated.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Better triage</h3>
            <p className="mt-2 text-sm text-foreground-muted">Sort submissions by structured risk signals before expert review queues become overloaded.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Better use of expert time</h3>
            <p className="mt-2 text-sm text-foreground-muted">Focus reviewers on unresolved technical weaknesses instead of repeating broad preliminary checks.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Clear documentation and auditability</h3>
            <p className="mt-2 text-sm text-foreground-muted">Keep a transparent record of what was checked, what is weak, and what still needs human decision-making.</p>
          </article>
        </div>
      </section>

      <section id="audience" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Who it is for</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Conference organizers</h3>
            <p className="mt-2 text-sm text-foreground-muted">Create structured intake triage when submission volume outpaces available reviewer capacity.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Publishers and journals</h3>
            <p className="mt-2 text-sm text-foreground-muted">Unify fragmented integrity checks and improve visibility into what is complete versus still pending.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Research organizations</h3>
            <p className="mt-2 text-sm text-foreground-muted">Run structured evaluation at scale with transparent records of potential weaknesses and unresolved risks.</p>
          </article>
        </div>
        <p className="text-sm text-foreground-muted max-w-4xl">
          Future expansion markets are below this wedge and include investment due diligence, pharma and biotech scouting, grant allocation, and enterprise R&D decisions.
        </p>
      </section>

      <section id="differentiation" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">What makes Referee different</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Beyond point solutions</h3>
            <p className="mt-2 text-sm text-foreground-muted">Most integrity tools focus on isolated checks such as plagiarism or anomaly detection. Referee adds an evaluation layer that combines checks into a reusable, structured record.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Transparent, challengeable output</h3>
            <p className="mt-2 text-sm text-foreground-muted">Referee reliability signals are linked to explicit flaw categories and unresolved checks, making the output auditable instead of opaque.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Infrastructure mindset</h3>
            <p className="mt-2 text-sm text-foreground-muted">Referee is built as workflow infrastructure for scholarly publishing operations, not as a manifesto or nonprofit movement layer.</p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5">
            <h3 className="text-lg font-semibold text-foreground">Founder-owned technical architecture</h3>
            <p className="mt-2 text-sm text-foreground-muted">The platform is architected and implemented by the founder, with core infrastructure built in Rust for reliability and performance.</p>
          </article>
        </div>
      </section>

      <section id="founder" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Founder</h2>
        <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-start rounded-xl border border-border bg-card-bg p-5">
          <div className="w-full max-w-[220px]">
            <Image
              src="/Erik_Schneider.png"
              alt="Erik Schneider, founder of Referee"
              width={220}
              height={220}
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div>
            <p className="text-foreground-secondary">
              Erik Schneider is the founder of Referee. He owns the vision, product roadmap, system architecture, and implementation end to end.
            </p>
            <p className="mt-3 text-foreground-secondary">
              He defines the evaluation model, translates it into product and technical decisions, and builds the platform in Rust. The focus is practical: deliver auditable screening infrastructure that supports expert judgment in high-volume publishing workflows.
            </p>
          </div>
        </div>
      </section>

      <section id="book-demo" className="mt-12 md:mt-16 mb-8 rounded-xl border border-border bg-primary-50/50 p-6 sm:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Book a demo</h2>
        <p className="mt-3 max-w-3xl mx-auto text-foreground-secondary">
          If you run conference, journal, publishing, or research-intake workflows, let&apos;s walk through the current product together. The demo includes a live dashboard and paper-checking flow, and we&apos;ll be explicit about what is ready now versus still in progress.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:erik@referee-project.com?subject=Referee%20demo%20request"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center"
          >
            Book a demo
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-100 transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center"
          >
            See how it works
          </a>
        </div>
        <p className="mt-4 text-sm text-foreground-muted">Or email directly: erik@referee-project.com</p>
      </section>
    </div>
  );
}
