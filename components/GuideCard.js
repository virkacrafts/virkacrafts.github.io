import Image from 'next/image'
import Link from 'next/link'

export default function GuideCard({guide}) {
  return <article className="guide-card">{guide.image && <Image src={guide.image} alt={guide.imageAlt || guide.title} width={640} height={420}/>}<div><p className="eyebrow">{guide.level || 'Crochet guide'}</p><h2><Link href={`/stitches/${guide.slug}`}>{guide.title}</Link></h2></div></article>
}
