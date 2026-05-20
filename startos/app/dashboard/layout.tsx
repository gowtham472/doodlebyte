'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileNav />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'
        )}
      >
        <Header />
        <main className="pt-16 mt-16 p-4 md:p-6 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
