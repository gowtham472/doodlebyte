'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, FileText, Search, Send, Eye, Copy, Trash2, MoreHorizontal, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { KPICard } from '@/components/shared/KPICard'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const mockInvoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: 85000, issued: new Date('2026-05-01'), due: new Date('2026-05-31'), status: 'paid' },
  { id: 'INV-002', client: 'TechStart Inc', amount: 45000, issued: new Date('2026-05-05'), due: new Date('2026-06-05'), status: 'sent' },
  { id: 'INV-003', client: 'Global Solutions', amount: 120000, issued: new Date('2026-04-25'), due: new Date('2026-05-25'), status: 'overdue' },
  { id: 'INV-004', client: 'Innovate Labs', amount: 62000, issued: new Date('2026-05-10'), due: new Date('2026-06-10'), status: 'partialpaid' },
  { id: 'INV-005', client: 'Digital Wave', amount: 28000, issued: new Date('2026-05-15'), due: new Date('2026-06-15'), status: 'draft' },
  { id: 'INV-006', client: 'StartupX', amount: 95000, issued: new Date('2026-05-18'), due: new Date('2026-06-18'), status: 'viewed' },
]

const statusVariant = (s: string) => {
  if (s === 'paid') return 'success'
  if (s === 'overdue') return 'danger'
  if (s === 'partialpaid') return 'warning'
  if (s === 'sent' || s === 'viewed') return 'info'
  return 'default'
}

const statusLabel = (s: string) => ({ draft: 'Draft', sent: 'Sent', viewed: 'Viewed', partialpaid: 'Partial', paid: 'Paid', overdue: 'Overdue', cancelled: 'Cancelled' }[s] || s)

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || inv.status === filter
    return matchSearch && matchFilter
  })

  const total = invoices.reduce((s, i) => s + i.amount, 0)
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const unpaid = invoices.filter(i => ['sent', 'viewed', 'partialpaid', 'overdue'].includes(i.status)).reduce((s, i) => s + i.amount, 0)
  const overdue = invoices.filter(i => i.status === 'overdue').length

  const handleDelete = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id))
    toast.success('Invoice deleted')
  }

  const handleSend = (id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'sent' } : i))
    toast.success('Invoice sent to client')
  }

  const FILTERS = ['all', 'draft', 'sent', 'viewed', 'paid', 'partialpaid', 'overdue']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage client invoices</p>
        </div>
        <Link href="/dashboard/finance/invoices/new">
          <Button><Plus className="h-4 w-4" /> New Invoice</Button>
        </Link>
      </div>

      {overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm font-medium text-red-800">{overdue} invoice{overdue > 1 ? 's are' : ' is'} overdue — take action now</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Invoiced" value={formatCurrency(total)} icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Collected" value={formatCurrency(paid)} icon={FileText} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="Outstanding" value={formatCurrency(unpaid)} icon={FileText} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <KPICard title="Overdue" value={String(overdue)} icon={AlertCircle} iconColor="text-red-600" iconBg="bg-red-50" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2 w-full sm:max-w-xs">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices..." className="bg-transparent text-sm w-full focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{f === 'partialpaid' ? 'Partial' : f}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title="No invoices found" description="Create your first invoice to start billing clients." actionLabel="New Invoice" onAction={() => {}} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                {['Invoice #', 'Client', 'Amount', 'Issued', 'Due Date', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-blue-600">
                      <Link href={`/dashboard/finance/invoices/${inv.id}`} className="hover:underline">{inv.id}</Link>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{inv.client}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(inv.amount)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(inv.issued)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(inv.due)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(inv.status)}>{statusLabel(inv.status)}</Badge></td>
                    <td className="px-4 py-3">
                      <Dropdown trigger={<button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><MoreHorizontal className="h-4 w-4" /></button>}>
                        <DropdownItem onClick={() => {}}><Eye className="h-4 w-4" /> View</DropdownItem>
                        {inv.status === 'draft' && <DropdownItem onClick={() => handleSend(inv.id)}><Send className="h-4 w-4" /> Send</DropdownItem>}
                        <DropdownItem onClick={() => toast.info('Duplicate created')}><Copy className="h-4 w-4" /> Duplicate</DropdownItem>
                        <DropdownItem danger onClick={() => handleDelete(inv.id)}><Trash2 className="h-4 w-4" /> Delete</DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
