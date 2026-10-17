import Image from 'next/image'

export default function AdSlot({ad, className = ''}) {
  if (!ad?.active || (!ad.image && !ad.label)) return null

  const content = <>
    {ad.image && <Image src={ad.image} alt={ad.imageAlt || ad.label || 'Advertisement'} width={960} height={240} sizes="(max-width: 760px) 100vw, 960px" />}
    {ad.label && <span>{ad.label}</span>}
  </>

  return <aside className={`ad-slot ${className}`} aria-label="Advertisement">
    {ad.link ? <a href={ad.link} target="_blank" rel="sponsored noopener noreferrer">{content}</a> : content}
  </aside>
}
