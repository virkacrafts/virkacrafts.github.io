import {firebaseConfig} from './firebase-config.js'
import {getApp, getApps, initializeApp} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'
import {addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp, where} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'
import {auth, isFirebaseConfigured} from './firebase-auth.js'

const app = isFirebaseConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null
const db = app ? getFirestore(app) : null

export function subscribeToComments(targetId, onChange, onError) {
  if (!db || !targetId) return () => {}
  const commentsQuery = query(
    collection(db, 'comments'),
    where('targetId', '==', targetId),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(commentsQuery, (snapshot) => {
    onChange(snapshot.docs.map((comment) => ({id: comment.id, ...comment.data()})))
  }, onError)
}

export async function postComment(targetId, text) {
  const user = auth?.currentUser
  if (!user) throw new Error('Please log in before posting a comment.')
  const cleanText = text.trim()
  if (!cleanText) throw new Error('Please write a comment first.')

  await addDoc(collection(db, 'comments'), {
    targetId,
    text: cleanText,
    userName: user.displayName || user.email || 'VirkaCrafts member',
    userEmail: user.email || '',
    createdAt: serverTimestamp(),
  })
}
