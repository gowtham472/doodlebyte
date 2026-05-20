import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from './firebase-admin'
import type { UserRole } from '@/types'

export interface AuthenticatedRequest extends NextRequest {
  uid: string
  email: string
  role: UserRole
  companyId: string
}

interface AuthContext {
  uid: string
  email: string
  role: UserRole
  companyId: string
}

export async function verifyAuth(req: NextRequest): Promise<AuthContext | NextResponse> {
  const sessionCookie = req.cookies.get('session')?.value

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true)
    const userDoc = await db.collection('users').doc(decoded.uid).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()!
    return {
      uid: decoded.uid,
      email: decoded.email || '',
      role: userData.role as UserRole,
      companyId: userData.companyId,
    }
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}

export function requireRole(context: AuthContext, ...roles: UserRole[]): NextResponse | null {
  if (!roles.includes(context.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return null
}
