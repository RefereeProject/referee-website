import Image from "next/image";
import Link from "next/link";

interface FounderTeaserProps { name: string; image: string; tagline: string; link?: string }

export function FounderTeaser({ name, image, tagline, link }: FounderTeaserProps) {
  return (
    <div className="founder card-flat">
      <Image src={image} alt={name} width={160} height={200} sizes="220px" className="founder-portrait" />
      <div>
        <h3>{name}</h3>
        <p className="mt-2.5">{tagline}</p>
        {link ? <Link className="link-detail mt-3 inline-block" href={link}>Learn more →</Link> : null}
      </div>
    </div>
  );
}
