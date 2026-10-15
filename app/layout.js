import './globals.css'
import './consent.css'
import './learning.css'
import {defaultDescription, siteName, siteUrl} from '../lib/site'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {default: `${siteName} | Crochet patterns & tools`, template: `%s | ${siteName}`},
  description: defaultDescription,
  keywords: ['crochet patterns', 'crochet learning', 'stitch guides'],
  alternates: {canonical: '/'},
  robots: {index: true, follow: true, googleBot: {'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1}},
  openGraph: {type: 'website', url: siteUrl, siteName, title: `${siteName} | Crochet patterns & tools`, description: defaultDescription, locale: 'en_US'},
  twitter: {card: 'summary_large_image', creator: '@virkacrafts'},
}

export default function RootLayout({children}) {
  return <html lang="en"><body>{children}</body></html>
}
