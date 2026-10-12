import PatternCard from '../../components/PatternCard'
import {sanityClient} from '../../lib/sanity'
import {patternsQuery} from '../../lib/queries'
export const metadata={title:'Crochet Patterns',description:'Browse VirkaCrafts crochet patterns for every skill level.',alternates:{canonical:'/patterns'}}
export default async function PatternsPage(){const patterns=await sanityClient.fetch(patternsQuery).catch(()=>[]);return <section className="container"><h1>Crochet patterns</h1><div className="grid">{patterns.map(pattern=><PatternCard key={pattern.id} pattern={pattern}/>)}</div></section>}
