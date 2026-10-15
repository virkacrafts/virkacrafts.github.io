import Image from 'next/image'
import Link from 'next/link'
import {sanityClient} from '../../../lib/sanity'
import {coursesQuery} from '../../../lib/queries'

export const metadata={title:'Crochet Learning Guides',description:'Structured crochet learning guides for every skill level.',alternates:{canonical:'/guides'}}
export const revalidate=300
export default async function GuidesPage(){const courses=await sanityClient.fetch(coursesQuery).catch(()=>[]);return <section className="container"><p className="eyebrow">Build your skills</p><h1>Crochet learning guides</h1><div className="grid">{courses.map(course=><article className="guide-card" key={course.id}>{course.image&&<Image src={course.image} alt={course.title} width={640} height={420}/>}<div><p className="eyebrow">{course.level}</p><h2><Link href={`/guides/${course.slug}`}>{course.title}</Link></h2><p>{course.summary}</p></div></article>)}</div>{!courses.length&&<p className="notice">Learning guides will appear here soon.</p>}</section>}
