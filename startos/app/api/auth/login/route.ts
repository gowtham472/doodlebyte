import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const { idToken, name, companyName } = await req.json()

    if (!idToken) {
      return NextResponse.json({ error: 'ID token required' }, { status: 400 })
    }

    const decoded = await auth.verifyIdToken(idToken)
    const userDoc = await db.collection('users').doc(decoded.uid).get()

    if (!userDoc.exists && name && companyName) {
      const companyRef = db.collection('companies').doc()
      await companyRef.set({
        name: companyName,
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        invoicePrefix: 'INV',
        settings: { paymentTerms: 'Net 30', taxRate: 18, brandColor: '#2563eb' },
        createdAt: new Date(),
      })

      await db.collection('users').doc(decoded.uid).set({
        uid: decoded.uid,
        name,
        email: decoded.email,
        role: 'admin',
        companyId: companyRef.id,
        createdAt: new Date(),
      })
    }

    const expiresIn = 7 * 24 * 60 * 60 * 1000
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({ success: true })
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expiresIn / 1000,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
