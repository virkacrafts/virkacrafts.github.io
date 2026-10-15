import PatternCard from '../../../../components/PatternCard'
import {sanityClient} from '../../../../lib/sanity'
import {categoryBySlugQuery, patternsByCategoryQuery} from '../../../../lib/queries'
export const revalidate=300
export async function generateMetadata({params}){const {slug}=await params,category=await sanityClient.fetch(categoryBySlugQuery,{slug}).catch(()=>null),title=category?.title||slug.replaceAll('-',' '),description=category?.description||`Browse ${title} crochet patterns from VirkaCrafts.`,url=`/categories/${slug}`;return {title:`${title} crochet patterns`,description,alternates:{canonical:url},openGraph:{title:`${title} crochet patterns`,description,url,type:'website'},twitter:{card:'summary',title:`${title} crochet patterns`,description}}}
export default async function CategoryPage({params}){const {slug}=await params,patterns=await sanityClient.fetch(patternsByCategoryQuery,{slug}).catch(()=>[]);return <section className="container"><h1>{slug.replaceAll('-',' ')} crochet patterns</h1><div className="grid">{patterns.map(pattern=><PatternCard key={pattern.id} pattern={pattern}/>)}</div></section>}
