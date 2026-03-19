import type { Metadata } from "next";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "About — The Referee Project",
  description:
    "Meet the team behind The Referee Project. Learn about our mission to transform research evaluation through transparency, reliability scores, and adversarial review.",
};

/**
 * About page component featuring team bio cards with profile images
 * Uses CSS animations for smooth fade-in effects without client-side JS
 */

type PersonProfile = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

const founder: PersonProfile = {
  name: "Erik Schneider",
  role: "Founder & Executive Director",
  image: "/Erik_Schneider.png",
  bio: "Erik has an eclectic background spanning finance, cybersecurity, and insider risk. He is the executive director of the Referee Project. A KPMG and Signpost Six alumnus, he holds a BA in history from the University of Virginia, an MBA from Vanderbilt University, and an MS in computer science from Technische Universiteit Eindhoven. In addition to his commercial projects, Erik is a board member of Maxim Nyansa Ghana, an NGO creating IT opportunities in Africa.",
  linkedin: "https://www.linkedin.com/in/erikschneider1/",
};

const advisors: PersonProfile[] = [
  {
    name: "Dr. Marcus Thomas",
    role: "Computational Scientist",
    image: "/Marcus_Thomas.jpg",
    bio: "Dr. Thomas is a computational scientist working as a Research Associate at Memorial Sloan Kettering Cancer Center in NYC. His work at the intersection of immuno-oncology, computer science and statistical physics aims to improve the computational pipelines used to create personalized tumor vaccines for cancer patients in clinical trials.",
    linkedin: "https://www.linkedin.com/in/marcus-thomas-a8359477/",
  },
];

/**
 * Profile card using landing-page surface language.
 * Stacked on mobile, side-by-side on md+.
 */
function PersonCard({ person }: { person: PersonProfile }) {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile image */}
        <div className="shrink-0">
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 144px, 176px"
            />
          </div>
        </div>

        {/* Bio content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{person.name}</h3>
            <p className="text-sm font-medium text-primary-600 mt-0.5">{person.role}</p>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">{person.bio}</p>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors duration-200 text-sm font-semibold"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="py-6 md:py-10">
      <PageIntro
        eyebrow="About"
        title="True transparency"
        description="Referee is founder-led infrastructure for scholarly publishing, built to make research reliability transparent, auditable, and machine-readable."
      />

      {/* Mission */}
      <section className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Our Mission</h2>
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-6 sm:p-8">
          <p className="text-foreground-secondary leading-relaxed">
            At Referee, we are driven by the mission to transform the research evaluation system fundamentally. Our innovative approach applies a universal reliability score to papers to enhance transparency, efficiency, and accountability in the review process. By prioritizing results over effort, our system incentivizes deep, focused scrutiny of research, ensuring that published works are both reliable and valid. We aim to democratize access to the peer review process, allowing a diverse range of contributors to participate and be rewarded for uncovering research inaccuracies. Our ultimate goal is to improve the quality of academic publications globally, making reliable research accessible and influential in shaping future advancements.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Leadership</h2>
        <PersonCard person={founder} />
      </section>

      {/* Advisors */}
      <section className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Our Advisor</h2>
        {advisors.map((advisor) => (
          <PersonCard key={advisor.name} person={advisor} />
        ))}
      </section>

      {/* Call for additional advisors */}
      <section className="mt-12 md:mt-16 rounded-xl border border-border bg-card-bg p-6 sm:p-8">
        <p className="text-foreground-secondary leading-relaxed">
          We&apos;re actively seeking additional qualified advisors to join our mission. If you have expertise in research methodology, statistical analysis, or academic publishing, we&apos;d love to hear from you at{" "}
          <a
            href="mailto:erik@referee-project.com"
            className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-2 underline-offset-2 transition-colors"
          >
            erik@referee-project.com
          </a>
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="mt-12 md:mt-16 mb-8 rounded-xl border border-border bg-primary-50/50 p-6 sm:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Interested in joining our mission?</h2>
        <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
          Reach out if you are interested in the project, want to collaborate, or would like to discuss research integrity.
        </p>
        <div className="mt-6">
          <a
            href="mailto:erik@referee-project.com"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold min-h-[48px]"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
