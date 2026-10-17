import './globals.css'
import './consent.css'
import './learning.css'
import {defaultDescription, siteName, siteUrl} from '../lib/site'
import {sanityNoCdnClient} from '../lib/sanity'
import {siteSettingsQuery} from '../lib/queries'

export async function generateMetadata() {
  const settings = await sanityNoCdnClient.fetch(siteSettingsQuery).catch(() => null)
  const title = settings?.siteTitle || siteName
  const icon = settings?.favicon || '/favicon.svg'

  return {
    metadataBase: new URL(siteUrl),
    title: {default: `${title} | Crochet patterns & tools`, template: `%s | ${title}`},
    description: defaultDescription,
    keywords: ['crochet patterns', 'crochet learning', 'stitch guides'],
    alternates: {canonical: '/'},
    icons: {icon, shortcut: icon, apple: icon},
    robots: {index: true, follow: true, googleBot: {'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1}},
    openGraph: {type: 'website', url: siteUrl, siteName: title, title: `${title} | Crochet patterns & tools`, description: defaultDescription, locale: 'en_US'},
    twitter: {card: 'summary_large_image', creator: '@virkacrafts'},
  }
}

export default function RootLayout({children}) {
  return <html lang="en"><body>{children}</body></html>
}
