'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import {onAuthStateChanged} from 'firebase/auth'
import {auth, db} from '../lib/firebase'

export default function Comments({targetId}) {
  const [user, setUser] = useState(null), [comments, setComments] = useState([]), [text, setText] = useState('')
  useEffect(() => auth ? onAuthStateChanged(auth, setUser) : undefined, [])
  useEffect(() => { if (!db || !targetId) return; return onSnapshot(query(collection(db, 'comments'), where('targetId', '==', targetId), orderBy('createdAt', 'desc')), snap => setComments(snap.docs.map(doc => ({id: doc.id, ...doc.data()})))) }, [targetId])
  async function submit(event) { event.preventDefault(); if (!user || !text.trim()) return; await addDoc(collection(db, 'comments'), {targetId, text: text.trim(), userId: user.uid, userName: user.displayName || user.email, createdAt: serverTimestamp()}); setText('') }
  return <section className="comments" aria-labelledby="comments-heading"><h2 id="comments-heading">Comments & feedback</h2>{user ? <form onSubmit={submit}><label htmlFor="comment">Share a question or tip</label><textarea id="comment" value={text} onChange={e => setText(e.target.value)} required /><button>Post comment</button></form> : <p><Link href="/login">Sign in</Link> to leave a comment.</p>}<div>{comments.map(comment => <article key={comment.id}><strong>{comment.userName}</strong><p>{comment.text}</p></article>)}</div></section>
}
