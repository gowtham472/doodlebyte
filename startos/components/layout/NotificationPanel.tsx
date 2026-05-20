'use client'

import { useEffect, useRef } from 'react'
import { X, Bell, CheckCheck, DollarSign, Briefcase, Users, AlertCircle, TrendingUp, Package } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'

interface Notification {
  id: string
  type: 'invoice' | 'project' | 'lead' | 'team' | 'alert' | 'product'
  title: string
  message: string
  date: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  { id: 'n1', type: 'invoice', title: 'Invoice Paid', message: 'Acme Corp paid INV-2026-005 (₹85,000)', date: new Date(Date.now() - 1000 * 60 * 15), read: false },
  { id: 'n2', type: 'lead', title: 'New Lead', message: 'Vikram Patel from FinEdge was added as a new lead', date: new Date(Date.now() - 1000 * 60 * 60 * 2), read: false },
  { id: 'n3', type: 'project', title: 'Milestone Achieved', message: 'Mobile App v2.0 reached 85% completion', date: new Date(Date.now() - 1000 * 60 * 60 * 5), read: false },
  { id: 'n4', type: 'alert', title: 'Invoice Overdue', message: 'INV-2026-003 (TechStart Inc) is 5 days overdue', date: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true },
  { id: 'n5', type: 'team', title: 'New Team Member', message: 'Anjali Singh joined as Frontend Intern', date: new Date(Date.now() - 1000 * 60 * 60 * 36), read: true },
  { id: 'n6', type: 'product', title: 'Feedback Received', message: 'New bug report on FinTrack App: iOS 17.4 crash', date: new Date(Date.now() - 1000 * 60 * 60 * 48), read: true },
]

const typeIcon = (type: Notification['type']) => {
  const map = {
    invoice: { Icon: DollarSign, bg: 'bg-green-100', color: 'text-green-600' },
    project: { Icon: Briefcase, bg: 'bg-blue-100', color: 'text-blue-600' },
    lead: { Icon: TrendingUp, bg: 'bg-purple-100', color: 'text-purple-600' },
    team: { Icon: Users, bg: 'bg-cyan-100', color: 'text-cyan-600' },
    alert: { Icon: AlertCircle, bg: 'bg-red-100', color: 'text-red-600' },
    product: { Icon: Package, bg: 'bg-amber-100', color: 'text-amber-600' },
  }
  return map[type] || { Icon: Bell, bg: 'bg-gray-100', color: 'text-gray-600' }
}

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  if (!open) return null

  const unread = mockNotifications.filter(n => !n.read).length

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-gray-700" />
          <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
          {unread > 0 && (
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{unread}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-400">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
        {mockNotifications.map(notif => {
          const { Icon, bg, color } = typeIcon(notif.type)
          return (
            <div key={notif.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/40' : ''}`}>
              <div className={`p-2 rounded-lg flex-shrink-0 ${bg}`}>
                <Icon className={`h-3.5 w-3.5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</p>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{formatRelativeDate(notif.date)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-gray-100 text-center">
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
      </div>
    </div>
  )
}
