'use client'

import { useState } from 'react'
import { Plus, TrendingDown, Search, Receipt, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { KPICard } from '@/components/shared/KPICard'
import { EmptyState } from '@/components/shared/EmptyState'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORIES = [
  { value: 'software', label: 'Software' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'salary', label: 'Salary' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'legal', label: 'Legal' },
  { value: 'office', label: 'Office' },
  { value: 'travel', label: 'Travel' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
]

const mockExpenses = [
  { id: '1', title: 'GitHub Copilot', category: 'software', amount: 8000, vendor: 'GitHub', date: new Date('2026-05-15'), paidBy: 'Admin', approvalStatus: 'approved', notes: 'Annual subscription' },
  { id: '2', title: 'AWS EC2 Instances', category: 'infrastructure', amount: 18500, vendor: 'Amazon', date: new Date('2026-05-10'), paidBy: 'Admin', approvalStatus: 'approved', notes: 'Monthly bill' },
  { id: '3', title: 'Google Ads Campaign', category: 'marketing', amount: 25000, vendor: 'Google', date: new Date('2026-05-08'), paidBy: 'Priya', approvalStatus: 'pending', notes: 'Q2 campaign' },
  { id: '4', title: 'Office Supplies', category: 'office', amount: 3200, vendor: 'Office Depot', date: new Date('2026-05-05'), paidBy: 'Ravi', approvalStatus: 'approved', notes: '' },
  { id: '5', title: 'Team Lunch', category: 'miscellaneous', amount: 4800, vendor: 'Zomato', date: new Date('2026-05-02'), paidBy: 'Admin', approvalStatus: 'rejected', notes: 'Monthly team lunch' },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ title: '', category: 'software', amount: '', vendor: '', paidBy: '', notes: '', date: new Date().toISOString().split('T')[0] })

  const filtered = expenses.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.vendor.toLowerCase().includes(search.toLowerCase()))
  const totalApproved = expenses.filter(e => e.approvalStatus === 'approved').reduce((s, e) => s + e.amount, 0)
  const totalPending = expenses.filter(e => e.approvalStatus === 'pending').reduce((s, e) => s + e.amount, 0)

  const handleAdd = () => {
    if (!form.title || !form.amount) { toast.error('Title and amount are required'); return }
    setExpenses(prev => [{ id: Date.now().toString(), title: form.title, category: form.category, amount: Number(form.amount), vendor: form.vendor, date: new Date(form.date), paidBy: form.paidBy, approvalStatus: 'pending', notes: form.notes }, ...prev])
    toast.success('Expense submitted for approval')
    setShowModal(false)
    setForm({ title: '', category: 'software', amount: '', vendor: '', paidBy: '', notes: '', date: new Date().toISOString().split('T')[0] })
  }

  const handleApprove = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, approvalStatus: 'approved' } : e))
    toast.success('Expense approved')
  }

  const handleReject = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, approvalStatus: 'rejected' } : e))
    toast.error('Expense rejected')
  }

  const statusBadgeVariant = (s: string) => s === 'approved' ? 'success' : s === 'rejected' ? 'danger' : 'warning'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-1">Track and approve company expenses</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Add Expense</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Approved (MTD)" value={formatCurrency(totalApproved)} icon={TrendingDown} iconColor="text-red-600" iconBg="bg-red-50" />
        <KPICard title="Pending Approval" value={formatCurrency(totalPending)} icon={TrendingDown} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <KPICard title="Total Expenses" value={String(expenses.length)} icon={Receipt} iconColor="text-gray-600" iconBg="bg-gray-100" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2 max-w-xs">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search expenses..." className="bg-transparent text-sm w-full focus:outline-none" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Receipt} title="No expenses yet" description="Submit your first expense for approval." actionLabel="Add Expense" onAction={() => setShowModal(true)} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                {['Date', 'Title', 'Category', 'Vendor', 'Amount', 'Paid By', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-600">{formatDate(item.date)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                    <td className="px-4 py-3"><Badge>{CATEGORIES.find(c => c.value === item.category)?.label || item.category}</Badge></td>
                    <td className="px-4 py-3 text-gray-600">{item.vendor || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-red-700">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3 text-gray-600">{item.paidBy || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant(item.approvalStatus)}>{item.approvalStatus}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {item.approvalStatus === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApprove(item.id)} className="text-green-600 hover:text-green-800"><CheckCircle2 className="h-4 w-4" /></button>
                          <button onClick={() => handleReject(item.id)} className="text-red-600 hover:text-red-800"><XCircle className="h-4 w-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Expense">
        <div className="space-y-4">
          <Input label="Expense Title" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. GitHub Copilot" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} options={CATEGORIES} />
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} placeholder="0.00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Vendor" value={form.vendor} onChange={e => setForm(p => ({...p, vendor: e.target.value}))} placeholder="e.g. Amazon" />
            <Input label="Paid By" value={form.paidBy} onChange={e => setForm(p => ({...p, paidBy: e.target.value}))} placeholder="e.g. Admin" />
          </div>
          <Input label="Date" type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Submit Expense</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
