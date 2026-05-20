'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Briefcase,
  Package,
  MessageSquare,
  UsersRound,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Finance', href: '/dashboard/finance/income', icon: DollarSign },
  { label: 'CRM', href: '/dashboard/crm/leads', icon: Users },
  { label: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'Feedback', href: '/dashboard/feedback', icon: MessageSquare },
  { label: 'Team', href: '/dashboard/team', icon: UsersRound },
  { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  if (!mobileMenuOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-gray-900">StartOS</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive ? 'text-blue-600' : 'text-gray-400')} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
