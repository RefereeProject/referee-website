import Image from "next/image";
import Link from "next/link";
export function FounderTeaser({ name, image, tagline, link }: { name: string; image: string; tagline: string; link?: string }) { return <div className="founder card-flat"><Image src={image} alt={name} width={160} height={200} className="founder-portrait" style={{ width: 160 }} /><div><h3>{name}</h3><p style={{ marginTop: 10 }}>{tagline}</p>{link ? <Link className="link-detail" href={link} style={{ display: "inline-block", marginTop: 12 }}>Learn more →</Link> : null}</div></div>; }
