import { cn } from "@/lib/utils";

interface AudienceCardProps { title: string; description: string; icon: React.ReactNode }

export function AudienceCard({ title, description, icon }: AudienceCardProps) {
  return (
    <article className="card-flat">
      <div className="aud-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{description}</p>
    </article>
  );
}

export function AudienceCardGrid({ items, className }: { items: AudienceCardProps[]; className?: string }) {
  return (
    <div className={cn("audience", className)}>
      {items.map((item) => <AudienceCard key={item.title} {...item} />)}
    </div>
  );
}
