import { CheckCircle, Construction } from "lucide-react";

interface StatusCalloutProps {
  /** Callout heading (e.g. "Current status") */
  title: string;
  /** Items that are working and available today */
  working: string[];
  /** Items that are still being improved */
  improving: string[];
}

/**
 * Honest status / limitations callout box.
 * Uses the primary-50 accent background to stand out from standard cards.
 * Separates "what's working" from "what's improving" so visitors
 * get a transparent view of current capabilities.
 */
export function StatusCallout({ title, working, improving }: StatusCalloutProps) {
  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      {/* Working items */}
      {working.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground">Working now</p>
          <ul className="mt-2 space-y-1.5">
            {working.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground-muted">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improving items */}
      {improving.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground">Still improving</p>
          <ul className="mt-2 space-y-1.5">
            {improving.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground-muted">
                <Construction className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
