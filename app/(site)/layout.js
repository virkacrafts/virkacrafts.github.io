import JsonLd from '../../components/JsonLd'
import SiteChrome from '../../components/SiteChrome'
import {sanityNoCdnClient} from '../../lib/sanity'
import {siteSettingsQuery} from '../../lib/queries'
import {siteName, siteUrl} from '../../lib/site'

export const revalidate = 300

export default async function SiteLayout({children}) {
  const settings = await sanityNoCdnClient.fetch(siteSettingsQuery).catch(() => null)
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'WebSite', name: siteName, url: siteUrl},
      {'@type': 'Organization', name: siteName, url: siteUrl, logo: `${siteUrl}/icon.png`, sameAs: []},
    ],
  }

  return <><JsonLd data={data}/><SiteChrome settings={settings}>{children}</SiteChrome></>
}
