import Link from 'next/link'
import AdSlot from '../../components/AdSlot'
import BlogCard from '../../components/BlogCard'
import PatternCard from '../../components/PatternCard'
import {sanityClient} from '../../lib/sanity'
import {patternsQuery, recentPostsQuery, siteSettingsQuery} from '../../lib/queries'

export const revalidate = 300

export default async function Home() {
  const [patterns, posts, settings] = await Promise.all([
    sanityClient.fetch(patternsQuery).catch(() => []),
    sanityClient.fetch(recentPostsQuery).catch(() => []),
    sanityClient.fetch(siteSettingsQuery).catch(() => null),
  ])
  const homeAd = settings?.adSlots?.find(slot => slot.slot === 'home-sidebar')

  return <div className="home-layout">
    <aside className="home-blog-sidebar" aria-labelledby="home-blog-title">
      <h2 id="home-blog-title">From the blog</h2>
      {posts.length ? <div className="home-blog-list">{posts.map(post => <BlogCard key={post.id} post={post}/>)}</div> : <p className="home-blog-empty">New crochet stories are coming soon.</p>}
      <Link className="blog-all-link" href="/blog">Visit the blog</Link>
    </aside>

    <div className="home-primary">
      <section className="hero"><p className="eyebrow">Free crochet patterns &amp; tools</p><h1>Create beautiful, handcrafted crochet designs.</h1><p>Learn at your own pace with patterns, courses, and practical tools made for makers.</p><Link className="button" href="/patterns">Explore patterns</Link></section>
      <section className="container home-patterns"><h2>Featured patterns</h2><div className="grid">{patterns.slice(0, 6).map(pattern => <PatternCard key={pattern.id} pattern={pattern}/>)}</div></section>
    </div>

    <aside className="home-ad-sidebar" aria-label="Sponsored content"><AdSlot ad={homeAd}/></aside>
  </div>
}
