'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../lib/firebase'

export default function Header({settings}) {
  const [user, setUser] = useState(null)
  useEffect(() => auth ? onAuthStateChanged(auth, setUser) : undefined, [])
  const title = settings?.siteTitle || 'VirkaCrafts'
  return <header className="site-header"><Link className="brand" href="/">{settings?.logo ? <Image className="brand-logo" src={settings.logo} alt={settings.logoAlt || title} width={220} height={64} priority/> : title}</Link><nav aria-label="Main navigation"><Link href="/patterns">Patterns</Link><Link href="/blog">Blog</Link><Link href="/stitches">Stitches</Link><Link href="/guides">Guides</Link><Link href="/calculators">Calculators</Link><Link href="/categories">Categories</Link><Link href="/about">About</Link></nav><div className="account">{user ? <><span>{user.displayName || user.email}</span><button onClick={() => signOut(auth)}>Sign out</button></> : <Link href="/login">Sign in</Link>}</div></header>
}
