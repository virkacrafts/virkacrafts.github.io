import Header from './Header'
import ConsentBanner from './ConsentBanner'
import AdSlot from './AdSlot'

export default function SiteChrome({children, settings}) {
  const globalAd = settings?.adSlots?.find(slot => slot.slot === 'global')
  return <><Header settings={settings}/><AdSlot ad={globalAd} className="global-ad-slot"/><main>{children}</main><footer><p>© {new Date().getFullYear()} {settings?.siteTitle || 'VirkaCrafts'}</p><nav aria-label="Footer navigation"><a href="/patterns">Patterns</a><a href="/blog">Blog</a><a href="/stitches">Basic stitches</a><a href="/guides">Learning guides</a><a href="/calculators">Calculators</a><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></nav></footer><ConsentBanner/></>
}
