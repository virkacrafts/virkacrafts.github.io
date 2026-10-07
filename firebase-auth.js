import { firebaseConfig } from './firebase-config.js'
import { getApp, getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

if (!isFirebaseConfigured) {
  console.warn('Firebase is not configured. Add the web-app values to firebase-config.js.')
}

const app = isFirebaseConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null
const auth = app ? getAuth(app) : null

export async function signUpWithEmail(email, password) {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password)
  await sendEmailVerification(result.user)
  await signOut(auth)
}

export async function signInWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email.trim(), password)
  if (!result.user.emailVerified) {
    await sendEmailVerification(result.user)
    await signOut(auth)
    return { verified: false }
  }
  return { verified: true, user: result.user }
}
