// This file is now deprecated and replaced by supabase.ts
// Keeping for reference but all functionality has been moved to supabase.ts
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDu_jqU7wO09scNVf6NrWBEnC_eli-ZKgI",
  authDomain: "bot-tubarao-v3.firebaseapp.com",
  projectId: "bot-tubarao-v3",
  storageBucket: "bot-tubarao-v3.firebasestorage.app",
  messagingSenderId: "977016143412",
  appId: "1:977016143412:web:50d97387b51899cc4ed461"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const createUser = async (email: string, password: string, name: string, activationCode: string) => {
  const activationCodes: Record<string, string> = {
    "TUBARAO2025": "Pro",
    "SHARKV3PRO": "Pro", 
    "TUBARAOELITE": "Elite",
    "SHARKULTRA": "Elite",
    "DEMO123": "Demo",
    "BASICO2025": "Básico"
  }

  if (!activationCodes[activationCode.toUpperCase()]) {
    throw new Error('Código de ativação inválido')
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, "users", userCredential.user.uid), {
    name,
    email,
    plan: activationCodes[activationCode.toUpperCase()],
    createdAt: new Date().toISOString()
  })

  return userCredential.user
}

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}