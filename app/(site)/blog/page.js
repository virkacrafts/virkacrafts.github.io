import BlogCard from '../../../components/BlogCard'
import {sanityClient} from '../../../lib/sanity'
import {postsQuery} from '../../../lib/queries'

export const revalidate = 300
export const metadata = {title: 'Blog', description: 'Crochet inspiration, tutorials, and tips from VirkaCrafts.'}

export default async function BlogIndexPage() {
  const posts = await sanityClient.fetch(postsQuery).catch(() => [])

  return <section className="container blog-index">
    <p className="eyebrow">VirkaCrafts journal</p>
    <h1>Blog</h1>
    <p className="blog-intro">Ideas, tips, and inspiration for your next crochet project.</p>
    {posts.length ? <div className="blog-grid">{posts.map(post => <BlogCard key={post.id} post={post}/>)}</div> : <p className="notice">No published blog posts are available yet.</p>}
  </section>
}
