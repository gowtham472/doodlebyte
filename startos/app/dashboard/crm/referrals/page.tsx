'use client'

import { useState } from 'react'
import { Plus, GitFork, Link2, Trophy, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { KPICard } from '@/components/shared/KPICard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const mockReferrals = [
  { id: '1', referrer: 'Rajesh Khanna', referred: 'Priya Sharma', date: new Date('2026-04-10'), status: 'converted', rewardValue: 5000, rewardPaid: true },
  { id: '2', referrer: 'Sunita Verma', referred: 'Rahul Gupta', date: new Date('2026-04-25'), status: 'pending', rewardValue: 5000, rewardPaid: false },
  { id: '3', referrer: 'Rajesh Khanna', referred: 'Anita Singh', date: new Date('2026-05-02'), status: 'won', rewardValue: 8000, rewardPaid: false },
  { id: '4', referrer: 'Arjun Mehta', referred: 'Vikram Patel', date: new Date('2026-05-08'), status: 'pending', rewardValue: 5000, rewardPaid: false },
]

const topReferrers = [
  { name: 'Rajesh Khanna', count: 3, revenue: 280000 },
  { name: 'Sunita Verma', count: 2, revenue: 145000 },
  { name: 'Arjun Mehta', count: 1, revenue: 95000 },
]

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState(mockReferrals)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ referrer: '', referred: '', rewardValue: '5000', date: new Date().toISOString().split('T')[0] })

  const handleAdd = () => {
    if (!form.referrer || !form.referred) { toast.error('Referrer and referred are required'); return }
    setReferrals(prev => [...prev, { id: Date.now().toString(), referrer: form.referrer, referred: form.referred, date: new Date(form.date), status: 'pending', rewardValue: Number(form.rewardValue), rewardPaid: false }])
    toast.success('Referral logged')
    setShowModal(false)
    setForm({ referrer: '', referred: '', rewardValue: '5000', date: new Date().toISOString().split('T')[0] })
  }

  const totalReferrals = referrals.length
  const converted = referrals.filter(r => r.status === 'converted' || r.status === 'won').length
  const rewardDue = referrals.filter(r => !r.rewardPaid && (r.status === 'converted' || r.status === 'won')).reduce((s, r) => s + r.rewardValue, 0)

  const statusVariant = (s: string) => ({ converted: 'success', won: 'success', pending: 'warning', lost: 'danger' }[s] as 'success' | 'warning' | 'danger' || 'default')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
          <p className="text-sm text-gray-500 mt-1">Track client referrals and rewards</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Log Referral</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Total Referrals" value={String(totalReferrals)} icon={GitFork} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <KPICard title="Converted" value={String(converted)} icon={Trophy} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="Reward Due" value={formatCurrency(rewardDue)} icon={TrendingUp} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Referral Log</h2>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {['Referrer', 'Referred', 'Date', 'Status', 'Reward', 'Paid'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {referrals.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.referrer}</td>
                  <td className="px-4 py-3 text-gray-700"><span className="flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5 text-gray-400" />{r.referred}</span></td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(r.date)}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(r.status)}>{r.status}</Badge></td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(r.rewardValue)}</td>
                  <td className="px-4 py-3"><Badge variant={r.rewardPaid ? 'success' : 'default'}>{r.rewardPaid ? 'Paid' : 'Pending'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Top Referrers</h2>
          <div className="space-y-4">
            {topReferrers.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'}`}>{i + 1}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.count} referral{r.count > 1 ? 's' : ''}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">{formatCurrency(r.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Log Referral">
        <div className="space-y-4">
          <Input label="Referrer (existing client)" value={form.referrer} onChange={e => setForm(p => ({...p, referrer: e.target.value}))} placeholder="e.g. Rajesh Khanna" />
          <Input label="Referred Person" value={form.referred} onChange={e => setForm(p => ({...p, referred: e.target.value}))} placeholder="e.g. Priya Sharma" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Reward Value (₹)" type="number" value={form.rewardValue} onChange={e => setForm(p => ({...p, rewardValue: e.target.value}))} />
            <Input label="Date" type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Log Referral</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
