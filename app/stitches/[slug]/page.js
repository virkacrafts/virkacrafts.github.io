import Image from 'next/image'
import {notFound} from 'next/navigation'
import RichText from '../../../components/RichText'
import {sanityClient} from '../../../lib/sanity'
import {guideBySlugQuery, guidesQuery} from '../../../lib/queries'

export const revalidate = 300
export async function generateStaticParams(){const guides=await sanityClient.fetch(guidesQuery).catch(()=>[]);return guides.map(guide=>({slug:guide.slug}))}
export async function generateMetadata({params}){const {slug}=await params;const guide=await sanityClient.fetch(guideBySlugQuery,{slug}).catch(()=>null);return guide?{title:guide.title,description:`Step-by-step ${guide.title} crochet stitch guide.`,alternates:{canonical:`/stitches/${guide.slug}`}}:{}}
export default async function StitchPage({params}){const {slug}=await params;const guide=await sanityClient.fetch(guideBySlugQuery,{slug}).catch(()=>null);if(!guide)notFound();return <article className="container prose"><p className="eyebrow">{guide.level} stitch</p><h1>{guide.title}</h1>{guide.image&&<Image className="detail-media" src={guide.image} alt={guide.title} width={1200} height={800} priority/>}<p><strong>US:</strong> {guide.usAbbreviation || '—'} &nbsp; <strong>UK:</strong> {guide.ukAbbreviation || '—'} &nbsp; <strong>Symbol:</strong> {guide.stitchSymbol || '—'}</p><RichText value={guide.instructions}/>{guide.instructionPdf&&<p><a className="button" href={guide.instructionPdf}>Download instructions PDF</a></p>}<section><h2>Step-by-step</h2><div className="steps">{guide.steps?.map((step,index)=><article className="step-card" key={`${step.title}-${index}`}><h3>{step.title || `Step ${index+1}`}</h3>{step.image&&<Image src={step.image} alt="" width={700} height={500}/>} {step.animation&&<img src={step.animation} alt=""/>}<p>{step.text}</p></article>)}</div></section></article>}
