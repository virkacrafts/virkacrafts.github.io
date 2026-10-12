import Link from 'next/link'
import {sanityClient} from '../../lib/sanity'
import {categoriesQuery} from '../../lib/queries'
export const metadata={title:'Crochet Categories',description:'Browse crochet patterns by category.',alternates:{canonical:'/categories'}}
export default async function Categories(){const categories=await sanityClient.fetch(categoriesQuery).catch(()=>[]);return <section className="container"><h1>Categories</h1><ul className="link-list">{categories.map(category=><li key={category.slug}><Link href={`/categories/${category.slug}`}>{category.title}</Link></li>)}</ul></section>}
