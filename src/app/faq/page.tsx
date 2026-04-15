import { PageIntro } from "@/components/PageIntro";
import { getSite } from "@/lib/content";
import { buildFaqPageSchema, serializeJsonLd } from "@/lib/structuredData";

export const metadata = {
  title: "Objections & Principles – The Referee Project",
  description:
    "Referee makes a direct claim about the scholarly record. That claim raises serious objections. We answer them here.",
};

/* ------------------------------------------------------------------ */
/*  Principles                                                         */
/* ------------------------------------------------------------------ */

const principles = [
  {
    question: "Why does Referee exist?",
    answer:
      "The current scholarly record asks outsiders to rely on too much opaque trust.\n\nReaders are asked to trust the paper, trust that peer review happened rigorously, and trust that the most important weaknesses were caught. Usually they cannot inspect what was actually checked, which standards were applied, or what remained unresolved.\n\nReferee adds a third layer: transparent reliability metadata attached to the paper itself. The aim is not certainty. The aim is legibility.",
  },
  {
    question: "Why use a reliability score at all?",
    answer:
      "Because the alternative is worse.\n\nToday, most people infer reliability from prestige signals: venue, citations, reputation, or institutional status. Those are crude proxies. A score is also a simplification, but at least it can be tied to explicit categories, evidence, and versioned rules.\n\nThe number is not the whole product. It is the summary layer. The real product is the inspectable record behind it.",
  },
  {
    question: "Why make the score machine-readable?",
    answer:
      "Because reliability information should travel with the paper.\n\nIf evaluation only exists as prose, PDFs, or scattered commentary, it stays fragmented and hard to use. A machine-readable score can be indexed, compared, updated, and integrated into search, dashboards, funder workflows, publisher systems, and diligence pipelines.\n\nHuman-readable explanation matters. Machine-readable structure matters too. Referee is built for both.",
  },
  {
    question: "Why decompose review into targeted checks?",
    answer:
      "Because traditional peer review bundles too many jobs into one person.\n\nA reviewer is often expected to be a domain expert, methodologist, statistician, auditor, skeptic, and editor all at once. That is bad system design. Many academics do not have the time, incentive, or breadth to do that work rigorously across every flaw type.\n\nReferee breaks evaluation into explicit categories and targeted checks. That makes review more systematic, more comparable, and more scalable.",
  },
  {
    question: "What role do experts still play?",
    answer:
      "An important one.\n\nReferee does not assume experts are useless. It assumes experts are scarce, overloaded, and unevenly equipped across different kinds of weaknesses. Some questions require deep domain judgment. Others do not.\n\nThe goal is not to eliminate experts. It is to stop wasting expert attention on tasks that can be made narrower, clearer, and more inspectable.",
  },
  {
    question:
      "Why should many targeted reviews be possible without a traditional academic referee?",
    answer:
      "Because many review tasks are not the same as \"judge this paper overall.\"\n\nChecking whether a paper omits key methodological details, contains impossible values, contradicts itself numerically, uses suspect data splits, or leaves core claims unverifiable often does not require a field-defining scholar. It requires a well-posed question, an explicit standard, and evidence.\n\nCredentials can matter. But they are not a substitute for transparent evaluation logic.",
  },
];

/* ------------------------------------------------------------------ */
/*  Objections                                                         */
/* ------------------------------------------------------------------ */

const objections = [
  {
    question: "Isn't a single score too reductive?",
    answer:
      "It would be, if the score were opaque.\n\nA reliability score only deserves trust if it can be unpacked: what was checked, what evidence was used, which categories were triggered, what remains unresolved, and which version of the scoring logic produced the output.\n\nReferee is not defending an unexplained number. It is defending a score with provenance.",
  },
  {
    question: "Can one framework really work across many disciplines?",
    answer:
      "Not as a rigid, one-size-fits-all doctrine.\n\nThe point of a shared framework is not to deny disciplinary differences. It is to standardize recurring weakness types where standardization is possible, then extend the system with domain-specific modules where needed.\n\nThe current system already applies inconsistent standards across fields. Referee does not create that problem. It makes standards more explicit and revisable.",
  },
  {
    question: "Why borrow from bug-bounty logic?",
    answer:
      "Because complex systems improve when weaknesses can be identified in narrow, testable ways.\n\nSoftware security improved when vulnerability discovery became more structured, more adversarial, and less dependent on closed trust networks. Scholarly evaluation has an analogous problem: too much is hidden, too much is informal, and too much depends on status.\n\nThe analogy is not perfect. Papers are not software. But the underlying insight matters: targeted challenge scales better than vague confidence.",
  },
  {
    question: "What prevents gaming?",
    answer:
      "Nothing prevents gaming entirely.\n\nThe serious question is whether a system becomes more fragile or more robust under adversarial pressure. Hidden systems get gamed too; they are just harder to inspect. Referee should be designed so that attempts to game the process leave traces, expose weak points, and improve the taxonomy and scoring logic over time.\n\nA transparent system can be attacked. It can also learn.",
  },
  {
    question: "How can non-experts contribute without lowering quality?",
    answer:
      "By narrowing the claim.\n\nReferee is based on the view that many useful review tasks can be specified more tightly than \"provide a full expert judgment on this paper.\" When the question is explicit and the evidence is inspectable, a broader set of contributors can test specific weaknesses responsibly.\n\nWhat matters is not whether every contributor carries the right status marker. What matters is whether the claim is clear, the evidence is reviewable, and the standard is explicit.",
  },
  {
    question: "What about AI errors, hallucinations, or shallow understanding?",
    answer:
      "AI should not be treated as an oracle.\n\nIts value here is narrower: executing structured checks, surfacing candidate weaknesses, preserving an audit trail, and helping scale evaluation across many papers and flaw categories. Any system like this should remain challengeable, versioned, and open about uncertainty.\n\nThe relevant comparison is not \"AI versus perfect expert review.\" It is \"transparent, inspectable evaluation versus the current mix of opacity, inconsistency, and limited reviewer effort.\"",
  },
  {
    question:
      "How does Referee relate to PubPeer and other post-publication commentary?",
    answer:
      "It is complementary.\n\nToday, useful criticism is scattered across PubPeer, Retraction Watch, journal correspondence, blogs, social platforms, and private conversations. That fragmentation makes it hard for outsiders to know where to look and hard for institutions to use reliability information systematically.\n\nReferee aims to make those signals more structured, more portable, and easier to attach to the paper itself.",
  },
  {
    question: "How will journals react?",
    answer:
      "Mixed at first.\n\nSome journals will resist because Referee makes evaluation more explicit and less dependent on closed processes. Others may eventually find value in structured reliability metadata, especially where submission volume exceeds careful review capacity.\n\nReferee is not built to preserve the comfort of the current publishing system. It is built to improve the legibility of the scholarly record.",
  },
  {
    question: "What about anonymity and accountability?",
    answer:
      "The core issue is evidence quality, not only source identity.\n\nIn some cases anonymity protects honest criticism. In other cases signed review may strengthen trust. Referee does not need one universal rule across all contexts. It does need a process where claims are specific, evidence-backed, and open to challenge.\n\nAccountability should attach to the quality of the claim and the transparency of the process, not only to institutional status.",
  },
  {
    question: "Doesn't this risk harming researchers' careers?",
    answer:
      "Transparency changes incentives. Some people will dislike that.\n\nBut discomfort is not a sufficient argument for preserving opacity. The better safeguard is not silence. It is precision: explicit scope, visible evidence, versioned outputs, and clear distinction between detected issues, audit gaps, and unresolved questions.\n\nReferee should not function as a hidden blacklist. It should function as a more legible and contestable layer in the scholarly record.",
  },
  {
    question: "How is this funded?",
    answer:
      "The near-term answer is practical: pilots, partnerships, and paid use by organizations that need structured reliability evaluation.\n\nThe longer-term answer is structural: society spends enormous resources generating research and comparatively little validating it. That imbalance should not be permanent. Funders, publishers, research organizations, and diligence teams all have a real interest in better reliability signals.",
  },
  {
    question: "How does Referee handle subjectivity and disagreement?",
    answer:
      "By refusing to pretend that all disagreement is noise.\n\nSome parts of research evaluation can be standardized. Some remain contestable. Referee should separate those two domains as clearly as possible. Where judgment calls remain, the system should make that visible rather than hiding it inside a single opaque verdict.\n\nThe goal is not to eliminate disagreement. The goal is to make disagreement more explicit, structured, and useful.",
  },
];

/* Combined list for structured-data (FAQ schema) */
const allFaqs = [...principles, ...objections];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

/** Renders a titled group of Q&A cards */
function QASection({
  heading,
  items,
}: {
  heading: string;
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-6">{heading}</h2>
      <div className="space-y-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card-bg p-5 sm:p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {item.question}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed whitespace-pre-line">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ObjectionsAndPrinciplesPage() {
  const site = await getSite();
  const faqJsonLd =
    allFaqs.length > 0
      ? serializeJsonLd(
          buildFaqPageSchema({
            siteUrl: site.link,
            faqs: allFaqs,
          }),
        )
      : null;

  return (
    <>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      ) : null}
      <div className="py-6 md:py-10">
        <PageIntro
          eyebrow="Objections & Principles"
          title="Objections and Principles"
          description="Referee exists to add quality and nuance to the scholarly record. It makes a direct claim: a scholarly paper should not enter the record carrying only the authors' claims and a journal's verdict. It should also carry transparent, inspectable reliability metadata — a versioned score, linked evidence, and explicit unresolved items. That claim raises serious objections. Some are practical. Some are philosophical. Some are about incentives, power, and academic culture. We take those objections seriously. We answer them directly here."
        />

        {/* Closing principle — displayed as a distinct callout */}
        <div className="mt-10 rounded-xl border border-primary-200 bg-primary-50/40 p-5 sm:p-6 text-sm text-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">Closing principle</p>
          <p>
            Referee is not a claim to perfect objectivity, complete automation,
            or final truth. It is a claim that the scholarly record should carry
            more explicit, inspectable, and portable reliability information than
            it does today. That is the standard.
          </p>
        </div>

        <QASection heading="Principles" items={principles} />
        <QASection heading="Objections" items={objections} />
      </div>
    </>
  );
}
