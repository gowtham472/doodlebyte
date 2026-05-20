import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from '@/lib/firebase-admin'

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value

  if (!sessionCookie) {
    return NextResponse.json({ error: 'No session' }, { status: 401 })
  }

  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true)
    const userDoc = await db.collection('users').doc(decoded.uid).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()!
    return NextResponse.json({
      user: {
        uid: decoded.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar || null,
        companyId: userData.companyId,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}
