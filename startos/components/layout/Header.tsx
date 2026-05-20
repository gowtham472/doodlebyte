'use client'

import { useState, useRef } from 'react'
import { Bell, Search, Menu, LogOut, Settings, User } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { NotificationPanel } from '@/components/layout/NotificationPanel'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function Header() {
  const { sidebarCollapsed, setMobileMenuOpen } = useUIStore()
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  return (
    <header
      className={cn(
        'h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 z-30 transition-all duration-300',
        sidebarCollapsed ? 'md:left-16' : 'md:left-60',
        'left-0'
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64 lg:w-80">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(p => !p)} className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar name={user?.name || 'User'} src={user?.avatar} size="sm" />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
            </button>
          }
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          <DropdownItem onClick={() => router.push('/dashboard/settings?tab=profile')}>
            <User className="h-4 w-4" /> Profile
          </DropdownItem>
          <DropdownItem onClick={() => router.push('/dashboard/settings')}>
            <Settings className="h-4 w-4" /> Settings
          </DropdownItem>
          <DropdownItem danger onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login') }}>
            <LogOut className="h-4 w-4" /> Sign Out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
