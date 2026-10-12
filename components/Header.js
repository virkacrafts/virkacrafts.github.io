'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../lib/firebase'

export default function Header() {
  const [user, setUser] = useState(null)
  useEffect(() => auth ? onAuthStateChanged(auth, setUser) : undefined, [])
  return <header className="site-header"><Link className="brand" href="/">VirkaCrafts</Link><nav aria-label="Main navigation"><Link href="/patterns">Patterns</Link><Link href="/categories">Categories</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><div className="account">{user ? <><span>{user.displayName || user.email}</span><button onClick={() => signOut(auth)}>Sign out</button></> : <Link href="/login">Sign in</Link>}</div></header>
}
