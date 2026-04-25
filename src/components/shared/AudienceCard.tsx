import { cn } from "@/lib/utils";
interface AudienceCardProps { title: string; description: string; icon: React.ReactNode }
export function AudienceCard({ title, description, icon }: AudienceCardProps) { return <article className="card-flat"><div className="aud-icon">{icon}</div><h4>{title}</h4><p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.55, marginTop: 6 }}>{description}</p></article>; }
export function AudienceCardGrid({ items, className }: { items: AudienceCardProps[]; className?: string }) { return <div className={cn("audience", className)}>{items.map((item) => <AudienceCard key={item.title} {...item} />)}</div>; }
