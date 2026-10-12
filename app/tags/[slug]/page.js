import PatternCard from '../../../components/PatternCard'
import {sanityClient} from '../../../lib/sanity'
import {patternsByTagQuery, tagBySlugQuery} from '../../../lib/queries'
export const revalidate=300
export async function generateMetadata({params}){const {slug}=await params,tag=await sanityClient.fetch(tagBySlugQuery,{slug}).catch(()=>null),title=tag?.title||slug.replaceAll('-',' '),description=`Browse crochet patterns tagged ${title}.`,url=`/tags/${slug}`;return {title:`${title} crochet patterns`,description,alternates:{canonical:url},openGraph:{title:`${title} crochet patterns`,description,url,type:'website'},twitter:{card:'summary',title:`${title} crochet patterns`,description}}}
export default async function TagPage({params}){const {slug}=await params,patterns=await sanityClient.fetch(patternsByTagQuery,{slug}).catch(()=>[]);return <section className="container"><h1>Tag: {slug.replaceAll('-',' ')}</h1><div className="grid">{patterns.map(pattern=><PatternCard key={pattern.id} pattern={pattern}/>)}</div></section>}
