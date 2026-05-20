'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Users, Star, HeartHandshake, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { KPICard } from '@/components/shared/KPICard'
import { formatCurrency } from '@/lib/utils'

const mockClients = [
  { id: '1', name: 'Rajesh Khanna', company: 'Acme Corp', email: 'rajesh@acme.com', phone: '+91 98765 43210', country: 'India', type: 'active', tags: ['enterprise', 'priority'], ltv: 450000, returnCount: 3, healthScore: 92 },
  { id: '2', name: 'Sunita Verma', company: 'TechStart Inc', email: 'sunita@techstart.com', phone: '+91 87654 32109', country: 'India', type: 'active', tags: ['startup'], ltv: 180000, returnCount: 1, healthScore: 78 },
  { id: '3', name: 'Arjun Mehta', company: 'Global Solutions', email: 'arjun@global.com', phone: '+91 76543 21098', country: 'India', type: 'active', tags: ['enterprise'], ltv: 320000, returnCount: 2, healthScore: 65 },
  { id: '4', name: 'Deepika Joshi', company: 'Innovate Labs', email: 'deepika@innovate.com', phone: '+91 65432 10987', country: 'India', type: 'inactive', tags: ['smb'], ltv: 90000, returnCount: 1, healthScore: 42 },
  { id: '5', name: 'Kiran Sharma', company: 'Digital Wave', email: 'kiran@digitalwave.com', phone: '+91 54321 09876', country: 'India', type: 'active', tags: ['startup', 'priority'], ltv: 215000, returnCount: 2, healthScore: 88 },
]

const healthColor = (score: number) => score >= 75 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'
const healthBg = (score: number) => score >= 75 ? 'bg-green-50' : score >= 50 ? 'bg-amber-50' : 'bg-red-50'

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockClients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.type === filter
    return matchSearch && matchFilter
  })

  const activeCount = mockClients.filter(c => c.type === 'active').length
  const totalLTV = mockClients.reduce((s, c) => s + c.ltv, 0)
  const returningCount = mockClients.filter(c => c.returnCount > 1).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your client relationships</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Client</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Active Clients" value={String(activeCount)} icon={Users} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Total LTV" value={formatCurrency(totalLTV)} icon={Star} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <KPICard title="Returning Clients" value={String(returningCount)} icon={HeartHandshake} iconColor="text-green-600" iconBg="bg-green-50" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2 max-w-xs">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." className="bg-transparent text-sm w-full focus:outline-none" />
          </div>
          <div className="flex gap-1">
            {['all', 'active', 'inactive'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map(client => (
            <div key={client.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <Avatar name={client.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/crm/clients/${client.id}`} className="font-medium text-gray-900 hover:text-blue-600 hover:underline">{client.name}</Link>
                  {client.returnCount > 1 && (
                    <span title={`${client.returnCount}x client`}>
                      <HeartHandshake className="h-3.5 w-3.5 text-blue-400" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{client.company} · {client.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {client.tags.map(tag => <Badge key={tag} className="text-xs">{tag}</Badge>)}
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(client.ltv)}</p>
                <p className="text-xs text-gray-400">Lifetime Value</p>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1">
                <div className={`px-2.5 py-1 rounded-lg text-sm font-bold ${healthBg(client.healthScore)} ${healthColor(client.healthScore)}`}>{client.healthScore}</div>
                <p className="text-xs text-gray-400">Health</p>
              </div>
              <div>
                <Badge variant={client.type === 'active' ? 'success' : 'default'}>{client.type}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
