import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount), storageBucket: process.env.FIREBASE_STORAGE_BUCKET })
  : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
