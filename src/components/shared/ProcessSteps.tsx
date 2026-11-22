import { cn } from "@/lib/utils";

interface Step { title: string; description: string }

interface ProcessStepsProps {
  steps: Step[];
  /**
   * Number of columns on wide screens. Defaults to 4; the About page passes 5
   * for its five-step pipeline. The value is exposed as `data-columns`, which
   * the `.steps` rule in globals.css reads, so narrower screens still fall
   * back to two columns and then one.
   */
  columns?: 4 | 5;
  className?: string;
}

export function ProcessSteps({ steps, columns = 4, className }: ProcessStepsProps) {
  return (
    <div className={cn("steps", className)} data-columns={columns}>
      {steps.map((step, idx) => (
        <article className="step" key={step.title}>
          <div className="step-num">Step {String(idx + 1).padStart(2, "0")}</div>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
