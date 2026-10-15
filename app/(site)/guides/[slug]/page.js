import Link from 'next/link'
import {notFound} from 'next/navigation'
import RichText from '../../../../components/RichText'
import {sanityClient} from '../../../../lib/sanity'
import {courseBySlugQuery, coursesQuery} from '../../../../lib/queries'

export const revalidate=300
export async function generateStaticParams(){const courses=await sanityClient.fetch(coursesQuery).catch(()=>[]);return courses.map(course=>({slug:course.slug}))}
export default async function CoursePage({params}){const {slug}=await params;const course=await sanityClient.fetch(courseBySlugQuery,{slug}).catch(()=>null);if(!course)notFound();return <article className="container prose"><p className="eyebrow">{course.level}</p><h1>{course.title}</h1><p>{course.summary}</p><RichText value={course.description}/><h2>Included stitch guides</h2><ul className="link-list">{course.guides?.map(guide=><li key={guide.slug}><Link href={`/stitches/${guide.slug}`}>{guide.title}</Link> — {guide.level}</li>)}</ul></article>}
