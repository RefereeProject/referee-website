import Image from "next/image";
import { Linkedin } from "lucide-react";

/**
 * About page component featuring team bio cards with profile images
 * Uses CSS animations for smooth fade-in effects without client-side JS
 */

const founder = {
  name: "Erik Schneider",
  role: "Founder & Executive Director",
  image: "/Erik_Schneider.png",
  bio: "Erik has an eclectic background spanning finance, cybersecurity, and insider risk. He is the executive director of the Referee Project. A KPMG and Signpost Six alumnus, he holds a BA in history from the University of Virginia, an MBA from Vanderbilt University, and an MS in computer science from Technische Universiteit Eindhoven. In addition to his commercial projects, Erik is a board member of Maxim Nyansa Ghana, an NGO creating IT opportunities in Africa.",
  linkedin: "https://www.linkedin.com/in/erikschneider1/",
};

const advisors = [
  {
    name: "Dr. Marcus Thomas",
    role: "Computational Scientist",
    image: "/Marcus_Thomas.jpg",
    bio: "Dr. Thomas is a computational scientist working as a Research Associate at Memorial Sloan Kettering Cancer Center in NYC. His work at the intersection of immuno-oncology, computer science and statistical physics aims to improve the computational pipelines used to create personalized tumor vaccines for cancer patients in clinical trials.",
    linkedin: "https://www.linkedin.com/in/marcus-thomas-a8359477/",
  },
];

function PersonCard({ person }: { person: typeof founder }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card-bg border border-card-border shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700" />

      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image */}
          <div className="shrink-0">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden ring-4 ring-primary-100 shadow-xl group-hover:ring-primary-200 transition-all duration-300">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 160px, 192px"
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {person.name}
              </h3>
              <p className="text-lg font-medium text-primary-600 mb-4">
                {person.role}
              </p>
            </div>

            <p className="text-foreground-secondary leading-relaxed text-lg">
              {person.bio}
            </p>

            {/* LinkedIn link */}
            <div className="flex gap-3 pt-4">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary-50/30 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            True transparency
          </h1>
        </div>

        {/* Mission Section */}
        <section className="mb-24 animate-fade-up-delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-12 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed max-w-4xl">
                At Referee, we are driven by the mission to transform the research evaluation system fundamentally. Our innovative approach applies a universal reliability score to papers to enhance transparency, efficiency, and accountability in the review process. By prioritizing results over effort, our system incentivizes deep, focused scrutiny of research, ensuring that published works are both reliable and valid. We aim to democratize access to the peer review process, allowing a diverse range of contributors to participate and be rewarded for uncovering research inaccuracies. Our ultimate goal is to improve the quality of academic publications globally, making reliable research accessible and influential in shaping future advancements.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-24 animate-fade-up-delay-2">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            Leadership
          </h2>
          <div className="max-w-4xl mx-auto">
            <PersonCard person={founder} />
          </div>
        </section>

        {/* Advisory Board Section */}
        <section className="animate-fade-up-delay-3">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Advisor
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {advisors.map((advisor) => (
              <PersonCard key={advisor.name} person={advisor} />
            ))}
          </div>

          {/* Call for additional advisors */}
          <div className="mt-12 text-center animate-fade-up-delay-4">
            <div className="inline-block rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100/50 px-8 py-6 border border-primary-200">
              <p className="text-lg text-foreground-secondary">
                We&apos;re actively seeking additional qualified advisors to join our mission. If you have expertise in research methodology, statistical analysis, or academic publishing, we&apos;d love to hear from you at{" "}
                <a
                  href="mailto:erik@referee-project.com"
                  className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                >
                  erik@referee-project.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="mt-24 text-center animate-fade-up-delay-5">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100/50 px-8 py-6 border border-primary-200">
            <p className="text-lg text-foreground-secondary mb-4">
              Interested in joining our mission?
            </p>
            <a
              href="mailto:erik@referee-project.com"
              className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
