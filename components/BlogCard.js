import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({post}) {
  return <article className="blog-card">
    {post.image && <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><Image src={post.image} alt={post.imageAlt || post.title} width={640} height={420} sizes="(max-width: 760px) 100vw, 280px" /></Link>}
    <div>
      {post.category && <p className="eyebrow">{post.category}</p>}
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      {post.excerpt && <p>{post.excerpt}</p>}
      <Link className="blog-read-more" href={`/blog/${post.slug}`}>Read article</Link>
    </div>
  </article>
}
