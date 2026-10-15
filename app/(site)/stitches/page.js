import GuideCard from '../../../components/GuideCard'
import {sanityClient} from '../../../lib/sanity'
import {guidesQuery} from '../../../lib/queries'

export const metadata = {title: 'Basic Crochet Stitches', description: 'Learn essential crochet stitches with clear, step-by-step guides.', alternates: {canonical: '/stitches'}}
export const revalidate = 300
export default async function StitchesPage() {
  const guides = await sanityClient.fetch(guidesQuery).catch(() => [])
  return <section className="container"><p className="eyebrow">Learn the essentials</p><h1>Basic crochet stitches</h1><p>Follow visual instructions, stitch symbols, and practical written guidance.</p><div className="grid">{guides.map(guide => <GuideCard key={guide.id} guide={guide}/>)}</div>{!guides.length && <p className="notice">New stitch guides will appear here soon.</p>}</section>
}
