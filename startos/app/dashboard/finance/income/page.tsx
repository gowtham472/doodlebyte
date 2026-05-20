'use client'

import { useState } from 'react'
import { Plus, TrendingUp, Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { KPICard } from '@/components/shared/KPICard'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORIES = [
  { value: 'service', label: 'Service Payment' },
  { value: 'product', label: 'Product Sale' },
  { value: 'retainer', label: 'Retainer' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'advance', label: 'Advance' },
  { value: 'other', label: 'Other' },
]

const PAYMENT_METHODS = [
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'cash', label: 'Cash' },
  { value: 'crypto', label: 'Crypto' },
]

const mockIncome = [
  { id: '1', date: new Date('2026-05-15'), client: 'Acme Corp', category: 'service', amount: 85000, method: 'bank', reference: 'TXN001', notes: 'Phase 1 payment' },
  { id: '2', date: new Date('2026-05-12'), client: 'TechStart Inc', category: 'retainer', amount: 45000, method: 'upi', reference: 'TXN002', notes: 'Monthly retainer' },
  { id: '3', date: new Date('2026-05-08'), client: 'Global Solutions', category: 'milestone', amount: 62000, method: 'bank', reference: 'TXN003', notes: 'Milestone 2 complete' },
  { id: '4', date: new Date('2026-05-01'), client: 'Innovate Labs', category: 'advance', amount: 30000, method: 'upi', reference: 'TXN004', notes: 'Project advance' },
  { id: '5', date: new Date('2026-04-28'), client: 'Digital Wave', category: 'product', amount: 12000, method: 'card', reference: 'TXN005', notes: '' },
]

export default function IncomePage() {
  const [income, setIncome] = useState(mockIncome)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ client: '', category: 'service', amount: '', method: 'bank', reference: '', notes: '', date: new Date().toISOString().split('T')[0] })

  const filtered = income.filter(i => i.client.toLowerCase().includes(search.toLowerCase()) || i.category.includes(search.toLowerCase()))
  const totalMTD = income.filter(i => i.date.getMonth() === new Date().getMonth()).reduce((s, i) => s + i.amount, 0)
  const totalAll = income.reduce((s, i) => s + i.amount, 0)

  const handleAdd = () => {
    if (!form.client || !form.amount) { toast.error('Client and amount are required'); return }
    setIncome(prev => [{ id: Date.now().toString(), date: new Date(form.date), client: form.client, category: form.category, amount: Number(form.amount), method: form.method, reference: form.reference, notes: form.notes }, ...prev])
    toast.success('Income recorded')
    setShowModal(false)
    setForm({ client: '', category: 'service', amount: '', method: 'bank', reference: '', notes: '', date: new Date().toISOString().split('T')[0] })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Income</h1>
          <p className="text-sm text-gray-500 mt-1">Track all incoming payments</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Add Income</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="This Month" value={formatCurrency(totalMTD)} icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="Total Revenue" value={formatCurrency(totalAll)} icon={TrendingUp} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Transactions" value={String(income.length)} icon={TrendingUp} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2 max-w-xs">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search income..." className="bg-transparent text-sm w-full focus:outline-none" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={TrendingUp} title="No income records" description="Add your first income entry to start tracking revenue." actionLabel="Add Income" onAction={() => setShowModal(true)} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                {['Date', 'Client', 'Category', 'Amount', 'Method', 'Reference', ''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-600">{formatDate(item.date)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.client}</td>
                    <td className="px-4 py-3"><Badge variant="info">{CATEGORIES.find(c => c.value === item.category)?.label || item.category}</Badge></td>
                    <td className="px-4 py-3 font-semibold text-green-700">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{item.method}</td>
                    <td className="px-4 py-3 text-gray-500">{item.reference || '—'}</td>
                    <td className="px-4 py-3 text-right"><button className="text-xs text-blue-600 hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Income">
        <div className="space-y-4">
          <Input label="Client Name" value={form.client} onChange={e => setForm(p => ({...p, client: e.target.value}))} placeholder="e.g. Acme Corp" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} options={CATEGORIES} />
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} placeholder="0.00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Payment Method" value={form.method} onChange={e => setForm(p => ({...p, method: e.target.value}))} options={PAYMENT_METHODS} />
            <Input label="Date" type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
          </div>
          <Input label="Reference / UTR" value={form.reference} onChange={e => setForm(p => ({...p, reference: e.target.value}))} placeholder="e.g. TXN123456" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional notes..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Save Income</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
