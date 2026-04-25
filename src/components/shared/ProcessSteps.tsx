import { cn } from "@/lib/utils";
interface Step { title: string; description: string }
export function ProcessSteps({ steps, className }: { steps: Step[]; className?: string }) {
  return <div className={cn("steps", className)}>{steps.map((step, idx) => <article className="step" key={step.title}><div className="step-num">Step {String(idx + 1).padStart(2, "0")}</div><h4>{step.title}</h4><p>{step.description}</p></article>)}</div>;
}
