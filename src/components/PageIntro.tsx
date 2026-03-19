import { AuroraBackground } from "./aurora-background";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/**
 * Shared aurora-backed page intro used across all interior routes.
 * Provides the same visual anchor as the landing Hero but at a compact height.
 * AuroraBackground is a client component, so this introduces one client boundary per route.
 */
export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <AuroraBackground className="rounded-xl">
      <div className="mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-10 sm:py-14">
        {eyebrow ? (
          <p className="text-sm sm:text-base font-semibold tracking-wide uppercase text-primary-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-foreground-secondary text-base sm:text-lg max-w-3xl mx-auto">
            {description}
          </p>
        ) : null}
        {children ? (
          <div className="mt-4">
            {children}
          </div>
        ) : null}
      </div>
    </AuroraBackground>
  );
}
