'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Globe, Star, HeartHandshake, Briefcase, FileText, MessageSquare, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/lib/utils'

const mockClient = {
  id: '1', name: 'Rajesh Khanna', company: 'Acme Corp', email: 'rajesh@acme.com', phone: '+91 98765 43210', country: 'India', type: 'active',
  tags: ['enterprise', 'priority'], ltv: 450000, returnCount: 3, healthScore: 92,
  projects: [
    { id: 'p1', name: 'Website Redesign', status: 'completed', amount: 120000 },
    { id: 'p2', name: 'Mobile App', status: 'inprogress', amount: 250000 },
  ],
  invoices: [
    { id: 'INV-001', amount: 85000, status: 'paid', date: new Date('2026-05-01') },
    { id: 'INV-002', amount: 45000, status: 'sent', date: new Date('2026-05-10') },
  ],
  activity: [
    { text: 'Invoice INV-001 paid', time: new Date(Date.now() - 86400000) },
    { text: 'Project Mobile App started', time: new Date(Date.now() - 604800000) },
    { text: 'Client onboarded', time: new Date('2025-01-15') },
  ],
}

const TABS = ['Overview', 'Projects', 'Invoices', 'Activity']

export default function ClientDetailPage() {
  const router = useRouter()
  const [tab, setTab] = useState('Overview')

  const statusBadge = (s: string) => ({ completed: 'success', inprogress: 'warning', planning: 'info', paid: 'success', sent: 'info', overdue: 'danger' }[s] as 'success' | 'warning' | 'info' | 'danger' || 'default')

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar name={mockClient.name} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">{mockClient.name}</h2>
              {mockClient.returnCount > 1 && <Badge variant="info"><HeartHandshake className="h-3 w-3 mr-1" />{mockClient.returnCount}x client</Badge>}
              <Badge variant="success">{mockClient.type}</Badge>
            </div>
            <p className="text-gray-600 mt-0.5">{mockClient.company}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" />{mockClient.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" />{mockClient.phone}</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" />{mockClient.country}</span>
            </div>
            <div className="flex gap-1.5 mt-2">{mockClient.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockClient.ltv)}</p>
              <p className="text-xs text-gray-500 mt-0.5">Lifetime Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{mockClient.healthScore}</p>
              <p className="text-xs text-gray-500 mt-0.5">Health Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: mockClient.projects.length, icon: Briefcase },
          { label: 'Total Invoiced', value: formatCurrency(mockClient.invoices.reduce((s, i) => s + i.amount, 0)), icon: FileText },
          { label: 'Total Paid', value: formatCurrency(mockClient.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)), icon: Star },
          { label: 'Return Count', value: mockClient.returnCount, icon: HeartHandshake },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-100">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>{t}</button>
          ))}
        </div>

        <div className="p-5">
          {tab === 'Overview' && (
            <div className="text-sm text-gray-600 space-y-2">
              <p>Member since: <strong>January 2025</strong></p>
              <p>Account manager: <strong>Admin</strong></p>
              <p>Last contacted: <strong>3 days ago</strong></p>
            </div>
          )}

          {tab === 'Projects' && (
            <div className="space-y-3">
              {mockClient.projects.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(p.amount)}</p>
                    </div>
                  </div>
                  <Badge variant={statusBadge(p.status)}>{p.status}</Badge>
                </div>
              ))}
            </div>
          )}

          {tab === 'Invoices' && (
            <div className="space-y-3">
              {mockClient.invoices.map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{inv.id}</p>
                    <p className="text-xs text-gray-500">{formatDate(inv.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{formatCurrency(inv.amount)}</span>
                    <Badge variant={statusBadge(inv.status)}>{inv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Activity' && (
            <div className="space-y-3">
              {mockClient.activity.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{act.text}</p>
                    <p className="text-xs text-gray-400">{formatDate(act.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
