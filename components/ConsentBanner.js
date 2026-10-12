'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'

const storageKey = 'virkacrafts-consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(!localStorage.getItem(storageKey)), [])
  function save(choice) {
    localStorage.setItem(storageKey, choice)
    document.cookie = `virkacrafts_consent=${choice}; path=/; max-age=31536000; SameSite=Lax`
    setVisible(false)
  }
  if (!visible) return null
  return <aside className="consent-banner" aria-label="Cookie and advertising consent" role="dialog"><p>We use essential cookies to run this website. With your permission, advertising partners may use cookies to show relevant ads. Read our <Link href="/privacy">Privacy Policy</Link>.</p><div className="consent-actions"><button className="text-button" onClick={() => save('rejected')}>Reject non-essential</button><button className="button" onClick={() => save('accepted')}>Accept</button></div></aside>
}
