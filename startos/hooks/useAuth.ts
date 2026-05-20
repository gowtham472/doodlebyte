'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api-client'
import type { User } from '@/types'

export function useAuth(redirectTo?: string) {
  const router = useRouter()
  const { user, loading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    async function verify() {
      try {
        const data = await api.get<{ user: User }>('/auth/verify')
        setUser(data.user)
      } catch {
        setUser(null)
        if (redirectTo) router.push(redirectTo)
      }
    }

    if (!user && loading) {
      verify()
    }
  }, [user, loading, setUser, setLoading, router, redirectTo])

  return { user, loading }
}
