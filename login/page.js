'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from '../../lib/firebase'

const friendlyError = (error) => {
  const messages = {
    'auth/email-already-in-use':
      'اس ای میل کے ساتھ اکاؤنٹ پہلے سے موجود ہے۔ براہِ کرم Log in کریں۔',
    'auth/invalid-email': 'براہِ کرم درست ای میل ایڈریس درج کریں۔',
    'auth/weak-password': 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔',
    'auth/invalid-credential': 'ای میل یا پاس ورڈ درست نہیں ہے۔',
    'auth/user-not-found': 'اس ای میل کے ساتھ کوئی اکاؤنٹ موجود نہیں ہے۔',
    'auth/wrong-password': 'ای میل یا پاس ورڈ درست نہیں ہے۔',
    'auth/popup-closed-by-user':
      'Google sign-in window بند کر دی گئی۔ براہِ کرم دوبارہ کوشش کریں۔',
    'auth/popup-blocked':
      'Browser نے sign-in popup روک دیا ہے۔ براہِ کرم popups allow کریں۔',
    'auth/account-exists-with-different-credential':
      'یہ ای میل پہلے کسی دوسرے sign-in طریقے سے استعمال ہو رہی ہے۔',
    'auth/too-many-requests':
      'بہت زیادہ کوششیں ہوئی ہیں۔ براہِ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔',
  }

  return messages[error.code] || error.message || 'کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔'
}

export default function LoginPage() {
  const router = useRouter()

  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isSignup = mode === 'signup'

  const completeLogin = (user) => {
    setStatus(`خوش آمدید، ${user.displayName || user.email}! آپ کامیابی سے sign in ہو گئے ہیں۔`)

    setTimeout(() => {
      router.push('/')
    }, 800)
  }

  const handleEmailAuth = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')
    setStatus('')

    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await sendEmailVerification(result.user)
        await signOut(auth)
        setStatus('Verification email bhej di gayi hai. Inbox aur Spam folder check kar ke link open karein, phir log in karein۔')
        setMode('login')
        return
      }

      const result = await signInWithEmailAndPassword(auth, email.trim(), password)
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user)
        await signOut(auth)
        setStatus('Aap ki email verify nahi hui. Hum ne naya verification link bhej diya hai—Inbox aur Spam folder check karein۔')
        return
      }

      completeLogin(result.user)
    } catch (firebaseError) {
      setError(friendlyError(firebaseError))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    setStatus('')

    try {
      const result = await signInWithPopup(auth, googleProvider)
      completeLogin(result.user)
    } catch (firebaseError) {
      setError(friendlyError(firebaseError))
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(isSignup ? 'login' : 'signup')
    setError('')
    setStatus('')
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="eyebrow">VirkaCrafts</p>

        <h1 id="auth-title">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>

        <p className="intro">
          {isSignup
            ? 'Save patterns and unlock advanced crochet learning materials.'
            : 'Log in to access your saved crochet patterns.'}
        </p>

        <form onSubmit={handleEmailAuth}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            minLength={6}
            required
            disabled={loading}
          />

          {error && (
            <p className="message error" role="alert">
              {error}
            </p>
          )}

          {status && (
            <p className="message success" role="status">
              {status}
            </p>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading
              ? 'Please wait...'
              : isSignup
                ? 'Create account'
                : 'Log in'}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button
          className="google-button"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <span aria-hidden="true">G</span>
          Continue with Google
        </button>

        <p className="switch-mode">
          {isSignup ? 'Already have an account?' : 'New to VirkaCrafts?'}{' '}
          <button type="button" onClick={switchMode} disabled={loading}>
            {isSignup ? 'Log in' : 'Create one'}
          </button>
        </p>
      </section>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #fff7ed;
          color: #282331;
          font-family: Arial, sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 38px;
          background: #ffffff;
          border: 1px solid #f0dfd1;
          border-radius: 18px;
          box-shadow: 0 18px 45px rgba(78, 42, 20, 0.12);
        }

        .eyebrow {
          margin: 0 0 8px;
          color: #e76f51;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          font-size: 30px;
        }

        .intro {
          margin: 12px 0 28px;
          color: #6d6470;
          line-height: 1.55;
        }

        label {
          display: block;
          margin: 16px 0 7px;
          font-size: 14px;
          font-weight: 700;
        }

        input {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #d9d2cb;
          border-radius: 9px;
          font: inherit;
          box-sizing: border-box;
        }

        input:focus {
          outline: 2px solid #f2a78d;
          border-color: #e76f51;
        }

        button {
          font: inherit;
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .primary-button,
        .google-button {
          width: 100%;
          min-height: 48px;
          border-radius: 9px;
          font-weight: 700;
        }

        .primary-button {
          margin-top: 22px;
          border: 0;
          color: white;
          background: #e76f51;
        }

        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid #d9d2cb;
          background: white;
          color: #312b36;
        }

        .google-button span {
          color: #4285f4;
          font-size: 19px;
          font-weight: 800;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
          color: #887e89;
          font-size: 13px;
        }

        .divider::before,
        .divider::after {
          flex: 1;
          height: 1px;
          content: '';
          background: #eee6df;
        }

        .message {
          margin: 16px 0 0;
          padding: 11px 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
        }

        .error {
          color: #a72f27;
          background: #fff0ee;
        }

        .success {
          color: #216a44;
          background: #eaf8ef;
        }

        .switch-mode {
          margin: 22px 0 0;
          text-align: center;
          color: #6d6470;
          font-size: 14px;
        }

        .switch-mode button {
          padding: 0;
          border: 0;
          color: #d95d40;
          background: transparent;
          font-weight: 700;
        }
      `}</style>
    </main>
  )
}
