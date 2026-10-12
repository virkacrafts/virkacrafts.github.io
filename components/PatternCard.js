import Image from 'next/image'
import Link from 'next/link'

export default function PatternCard({pattern}) {
  return <article className="pattern-card">
    {pattern.image && <Image src={pattern.image} alt={pattern.title || 'Crochet pattern'} width={640} height={480} sizes="(max-width: 700px) 100vw, 33vw" />}
    <div><p className="eyebrow">{pattern.category || 'Crochet pattern'} · {pattern.difficulty}</p><h2><Link href={`/patterns/${pattern.slug}`}>{pattern.title}</Link></h2><p>{pattern.description}</p></div>
  </article>
}
