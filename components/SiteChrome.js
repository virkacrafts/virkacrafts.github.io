'use client'

import {usePathname} from 'next/navigation'
import Header from './Header'
import ConsentBanner from './ConsentBanner'

export default function SiteChrome({children}) {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return <main>{children}</main>
  return <><Header/><main>{children}</main><footer><p>© {new Date().getFullYear()} VirkaCrafts</p><nav aria-label="Footer navigation"><a href="/patterns">Patterns</a><a href="/stitches">Basic stitches</a><a href="/guides">Learning guides</a><a href="/calculators">Calculators</a><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></nav></footer><ConsentBanner/></>
}
