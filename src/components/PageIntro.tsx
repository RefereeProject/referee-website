import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /**
   * "article" narrows the band's content to the same centred reading column
   * as a blog post's body, so the title lines up with the first line of text
   * instead of sitting far to its left.
   */
  width?: "default" | "article";
  children?: React.ReactNode;
};

/**
 * Navy title band that opens every interior page, so About, FAQ, Talks and
 * the blog start with the same weight as the home hero.
 *
 * `children` render below the description (the blog article uses this for
 * its publication date).
 */
export function PageIntro({ eyebrow, title, description, width = "default", children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className={cn("page-intro-inner", width === "article" && "article")}>
          <p className="eyebrow">{eyebrow ?? "Referee"}</p>
          <h1>{title}</h1>
          {description ? <p className="page-intro-lead">{description}</p> : null}
          {children ? <div className="page-intro-extra">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
