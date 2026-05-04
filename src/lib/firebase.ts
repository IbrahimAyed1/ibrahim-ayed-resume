// Lazy-loaded Firebase. The config is read at module load (cheap), but the
// actual Firebase SDK is only imported the first time getFirestoreDb() is
// called. Keeps Firebase out of the initial JS bundle.

import type { Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredConfigKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
] as const

export const missingFirebaseConfig = requiredConfigKeys.filter(
  (key) => !firebaseConfig[key],
)

export const isFirebaseConfigured = missingFirebaseConfig.length === 0

let dbPromise: Promise<Firestore | undefined> | null = null

/**
 * Lazily initialize Firebase + Firestore on first call. Returns undefined if
 * the Firebase env vars are missing. Subsequent calls reuse the same instance.
 */
export function getFirestoreDb(): Promise<Firestore | undefined> {
  if (!isFirebaseConfigured) return Promise.resolve(undefined)
  if (!dbPromise) {
    dbPromise = (async () => {
      const [{ initializeApp }, { getFirestore }] = await Promise.all([
        import('firebase/app'),
        import('firebase/firestore'),
      ])
      const app = initializeApp(firebaseConfig)
      return getFirestore(app)
    })()
  }
  return dbPromise
}
