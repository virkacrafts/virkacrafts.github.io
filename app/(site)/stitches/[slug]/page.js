import Image from 'next/image'
import {notFound} from 'next/navigation'
import RichText from '../../../../components/RichText'
import {sanityClient} from '../../../../lib/sanity'
import {guideBySlugQuery, guidesQuery} from '../../../../lib/queries'

export const revalidate = 300

export async function generateStaticParams() {
  const guides = await sanityClient.fetch(guidesQuery).catch(() => [])
  return guides.map(guide => ({slug: guide.slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const guide = await sanityClient.fetch(guideBySlugQuery, {slug}).catch(() => null)
  return guide ? {
    title: guide.title,
    description: `Step-by-step ${guide.title} crochet stitch guide.`,
    alternates: {canonical: `/stitches/${guide.slug}`},
  } : {}
}

function GuideFigure({src, alt, caption, className = '', priority = false}) {
  if (!src) return null
  return <figure className={`guide-figure ${className}`}>
    <Image src={src} alt={alt || ''} width={1200} height={800} priority={priority}/>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

export default async function StitchPage({params}) {
  const {slug} = await params
  const guide = await sanityClient.fetch(guideBySlugQuery, {slug}).catch(() => null)
  if (!guide) notFound()

  return <article className="container prose">
    <p className="eyebrow">{guide.level} stitch</p>
    <h1>{guide.title}</h1>
    <GuideFigure src={guide.image} alt={guide.imageAlt || guide.title} priority/>
    <p><strong>US:</strong> {guide.usAbbreviation || '—'} &nbsp; <strong>UK:</strong> {guide.ukAbbreviation || '—'} &nbsp; <strong>Symbol:</strong> {guide.stitchSymbol || '—'}</p>

    {guide.drawingImage && <section className="guide-artwork"><h2>Stitch drawing</h2><GuideFigure src={guide.drawingImage} alt={guide.drawingImageAlt || `${guide.title} stitch drawing`}/></section>}
    {guide.symbolImage && <section className="guide-artwork"><h2>Stitch symbol</h2><GuideFigure src={guide.symbolImage} alt={guide.symbolImageAlt || `${guide.title} symbol`}/></section>}
    {guide.referenceImages?.some(image => image?.url) && <section className="guide-artwork"><h2>Gallery and reference images</h2><div className="guide-gallery">{guide.referenceImages.filter(image => image?.url).map((image, index) => <figure key={image._key || image.url || index}><Image src={image.url} alt={image.alt || `${guide.title} reference ${index + 1}`} width={900} height={700}/>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}

    <RichText value={guide.instructions}/>
    {guide.instructionPdf && <p><a className="button" href={guide.instructionPdf} target="_blank" rel="noopener noreferrer">View or download PDF instructions</a></p>}

    {guide.steps?.length > 0 && <section><h2>Step-by-step</h2><div className="steps">{guide.steps.map((step, index) => <article className="step-card" key={step._key || `${step.title}-${index}`}>
      <h3>{step.title || `Step ${index + 1}`}</h3>
      {step.image && <Image src={step.image} alt={step.imageAlt || `${guide.title}, ${step.title || `step ${index + 1}`}`} width={700} height={500}/>}
      {step.animation && <img src={step.animation} alt={`${guide.title} step ${index + 1} animation`}/>}
      {step.text && <p>{step.text}</p>}
    </article>)}</div></section>}
  </article>
}
