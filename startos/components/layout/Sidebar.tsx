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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'
import { Tooltip } from '@/components/ui/Tooltip'

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

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 fixed left-0 top-0 z-40',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className={cn('flex items-center border-b border-gray-100 h-16 px-4', sidebarCollapsed ? 'justify-center' : 'justify-between')}>
        {!sidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-gray-900">StartOS</span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  sidebarCollapsed && 'justify-center px-2'
                )}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            )

            return (
              <li key={item.href}>
                {sidebarCollapsed ? (
                  <Tooltip content={item.label} side="top">
                    {linkContent}
                  </Tooltip>
                ) : (
                  linkContent
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
