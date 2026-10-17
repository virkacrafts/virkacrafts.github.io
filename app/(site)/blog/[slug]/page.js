import Image from 'next/image'
import {notFound} from 'next/navigation'
import RichText from '../../../../components/RichText'
import {sanityClient} from '../../../../lib/sanity'
import {postBySlugQuery, postsQuery} from '../../../../lib/queries'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(postsQuery).catch(() => [])
  return posts.map(post => ({slug: post.slug}))
}

export async function generateMetadata({params}) {
  const {slug} = await params
  const post = await sanityClient.fetch(postBySlugQuery, {slug}).catch(() => null)
  return post ? {title: post.title, description: post.excerpt || `Read ${post.title} on VirkaCrafts.`} : {}
}

export default async function BlogPostPage({params}) {
  const {slug} = await params
  const post = await sanityClient.fetch(postBySlugQuery, {slug}).catch(() => null)
  if (!post) notFound()

  return <article className="container prose blog-post">
    <p className="eyebrow">{post.category || 'VirkaCrafts blog'}</p>
    <h1>{post.title}</h1>
    {post.publishedAt && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</time>}
    {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
    {post.image && <Image className="blog-post-image" src={post.image} alt={post.imageAlt || post.title} width={1200} height={800} priority/>}
    <RichText value={post.body}/>
    {post.tags?.filter(Boolean).length > 0 && <p className="blog-tags"><strong>Tags:</strong> {post.tags.filter(Boolean).map((tag, index) => <span key={tag.slug || tag.title}>{index > 0 && ', '}{tag.title}</span>)}</p>}
  </article>
}
