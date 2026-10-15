import Link from 'next/link'
import AdSlot from '../../components/AdSlot'
import PatternCard from '../../components/PatternCard'
import {sanityClient} from '../../lib/sanity'
import {patternsQuery} from '../../lib/queries'
export const revalidate=300
export default async function Home(){const patterns=await sanityClient.fetch(patternsQuery).catch(()=>[]);return <><section className="hero"><p className="eyebrow">Free crochet patterns & tools</p><h1>Create beautiful, handcrafted crochet designs.</h1><p>Learn at your own pace with patterns, courses, and practical tools made for makers.</p><Link className="button" href="/patterns">Explore patterns</Link></section><AdSlot/><section className="container"><h2>Featured patterns</h2><div className="grid">{patterns.slice(0,6).map(pattern=><PatternCard key={pattern.id} pattern={pattern}/>)}</div></section></>}
