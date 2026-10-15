import JsonLd from '../../components/JsonLd'
import SiteChrome from '../../components/SiteChrome'
import {siteName, siteUrl} from '../../lib/site'

export default function SiteLayout({children}) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'WebSite', name: siteName, url: siteUrl},
      {'@type': 'Organization', name: siteName, url: siteUrl, logo: `${siteUrl}/icon.png`, sameAs: []},
    ],
  }

  return <><JsonLd data={data}/><SiteChrome>{children}</SiteChrome></>
}
