'use client'

import {useEffect, useState} from 'react'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import {onAuthStateChanged} from 'firebase/auth'
import {auth, db} from '../lib/firebase'

export default function Comments({targetId}) {
  const [comments, setComments] = useState([])
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  useEffect(() => {
    if (!targetId) return undefined
    const commentsQuery = query(
      collection(db, 'comments'),
      where('targetId', '==', targetId),
      orderBy('createdAt', 'desc'),
    )
    return onSnapshot(commentsQuery, (snapshot) => {
      setComments(snapshot.docs.map((comment) => ({id: comment.id, ...comment.data()})))
    }, (snapshotError) => setError(snapshotError.message))
  }, [targetId])

  const submitComment = async (event) => {
    event.preventDefault()
    if (!user) return
    const cleanText = text.trim()
    if (!cleanText) return
    setPosting(true)
    setError('')
    try {
      await addDoc(collection(db, 'comments'), {
        targetId,
        text: cleanText,
        userName: user.displayName || user.email || 'VirkaCrafts member',
        userEmail: user.email || '',
        createdAt: serverTimestamp(),
      })
      setText('')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setPosting(false)
    }
  }

  return (
    <section className="comments" aria-label="Comments">
      <h2>Comments & feedback</h2>
      {user ? (
        <form onSubmit={submitComment}>
          <label htmlFor={`comment-${targetId}`}>Share a question or tip</label>
          <textarea id={`comment-${targetId}`} value={text} onChange={(event) => setText(event.target.value)} required />
          <button type="submit" disabled={posting}>{posting ? 'Posting…' : 'Post comment'}</button>
        </form>
      ) : <p>Please log in to leave a comment.</p>}
      {error && <p role="alert">{error}</p>}
      {comments.length ? <ul>{comments.map((comment) => <li key={comment.id}><strong>{comment.userName}</strong><p>{comment.text}</p></li>)}</ul> : <p>No comments yet.</p>}
    </section>
  )
}
