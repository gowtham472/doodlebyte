'use client'

import { useState } from 'react'
import { Plus, Flame, Thermometer, Snowflake, Trophy, XCircle, Search, UserPlus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
interface Lead { id: string; name: string; company: string; value: number; stage: LeadStage; priority: 'hot' | 'warm' | 'cold'; assignedTo: string; daysInStage: number; source: string }

const STAGES: { key: LeadStage; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-50 border-blue-200' },
  { key: 'contacted', label: 'Contacted', color: 'bg-cyan-50 border-cyan-200' },
  { key: 'qualified', label: 'Qualified', color: 'bg-indigo-50 border-indigo-200' },
  { key: 'proposal', label: 'Proposal', color: 'bg-purple-50 border-purple-200' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-amber-50 border-amber-200' },
  { key: 'won', label: 'Won', color: 'bg-green-50 border-green-200' },
  { key: 'lost', label: 'Lost', color: 'bg-red-50 border-red-200' },
]

const mockLeads: Lead[] = [
  { id: '1', name: 'Priya Sharma', company: 'TechStart Inc', value: 150000, stage: 'new', priority: 'hot', assignedTo: 'Ravi', daysInStage: 1, source: 'website' },
  { id: '2', name: 'Rahul Gupta', company: 'DataNova', value: 80000, stage: 'contacted', priority: 'warm', assignedTo: 'Admin', daysInStage: 3, source: 'referral' },
  { id: '3', name: 'Anita Singh', company: 'CloudEdge', value: 220000, stage: 'qualified', priority: 'hot', assignedTo: 'Ravi', daysInStage: 5, source: 'cold' },
  { id: '4', name: 'Vikram Patel', company: 'InnovateCo', value: 95000, stage: 'proposal', priority: 'warm', assignedTo: 'Admin', daysInStage: 7, source: 'social' },
  { id: '5', name: 'Meena Reddy', company: 'FinFlow', value: 310000, stage: 'negotiation', priority: 'hot', assignedTo: 'Ravi', daysInStage: 4, source: 'referral' },
  { id: '6', name: 'Sanjay Kumar', company: 'EduTech', value: 45000, stage: 'won', priority: 'warm', assignedTo: 'Admin', daysInStage: 0, source: 'website' },
  { id: '7', name: 'Kavita Nair', company: 'RetailX', value: 70000, stage: 'lost', priority: 'cold', assignedTo: 'Ravi', daysInStage: 0, source: 'cold' },
]

const PriorityIcon = ({ p }: { p: string }) => {
  if (p === 'hot') return <Flame className="h-3.5 w-3.5 text-red-500" />
  if (p === 'warm') return <Thermometer className="h-3.5 w-3.5 text-amber-500" />
  return <Snowflake className="h-3.5 w-3.5 text-blue-400" />
}

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [form, setForm] = useState({ name: '', company: '', value: '', priority: 'warm', source: 'website', assignedTo: '' })

  const handleAddLead = () => {
    if (!form.name || !form.company) { toast.error('Name and company required'); return }
    setLeads(prev => [...prev, { id: Date.now().toString(), name: form.name, company: form.company, value: Number(form.value) || 0, stage: 'new', priority: form.priority as 'hot' | 'warm' | 'cold', assignedTo: form.assignedTo, daysInStage: 0, source: form.source }])
    toast.success('Lead added')
    setShowModal(false)
    setForm({ name: '', company: '', value: '', priority: 'warm', source: 'website', assignedTo: '' })
  }

  const moveStage = (id: string, stage: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage, daysInStage: 0 } : l))
    toast.success(`Moved to ${stage}`)
  }

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()))

  const totalValue = leads.filter(l => l.stage !== 'lost').reduce((s, l) => s + l.value, 0)
  const wonValue = leads.filter(l => l.stage === 'won').reduce((s, l) => s + l.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">Pipeline value: {formatCurrency(totalValue)} · Won: {formatCurrency(wonValue)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button onClick={() => setView('kanban')} className={`px-3 py-2 text-sm font-medium transition-colors ${view === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Kanban</button>
            <button onClick={() => setView('list')} className={`px-3 py-2 text-sm font-medium transition-colors ${view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>List</button>
          </div>
          <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Add Lead</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-xs">
          <Search className="h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." className="bg-transparent text-sm w-full focus:outline-none" />
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.stage === stage.key)
            return (
              <div key={stage.key} className={`flex-shrink-0 w-64 rounded-xl border ${stage.color} p-3`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stage.key === 'won' && <Trophy className="h-4 w-4 text-green-600" />}
                    {stage.key === 'lost' && <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="font-semibold text-sm text-gray-700">{stage.label}</span>
                  </div>
                  <Badge>{stageLeads.length}</Badge>
                </div>
                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm text-gray-900 leading-tight">{lead.name}</p>
                        <PriorityIcon p={lead.priority} />
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{lead.company}</p>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{formatCurrency(lead.value)}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{lead.daysInStage}d in stage</span>
                        <Dropdown
                          trigger={<button className="p-0.5 rounded hover:bg-gray-100 text-gray-400"><MoreHorizontal className="h-3.5 w-3.5" /></button>}
                        >
                          {STAGES.filter(s => s.key !== stage.key).map(s => (
                            <DropdownItem key={s.key} onClick={() => moveStage(lead.id, s.key)}>
                              → {s.label}
                            </DropdownItem>
                          ))}
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {['Name', 'Company', 'Value', 'Stage', 'Priority', 'Source', 'Assigned To', ''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.company}</td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(lead.value)}</td>
                  <td className="px-4 py-3"><Badge>{lead.stage}</Badge></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><PriorityIcon p={lead.priority} /><span className="text-xs capitalize">{lead.priority}</span></div></td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{lead.source}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.assignedTo || '—'}</td>
                  <td className="px-4 py-3"><button className="text-xs text-blue-600 hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Lead">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="John Doe" />
            <Input label="Company" value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} placeholder="Acme Corp" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Deal Value (₹)" type="number" value={form.value} onChange={e => setForm(p => ({...p, value: e.target.value}))} placeholder="0" />
            <Input label="Assigned To" value={form.assignedTo} onChange={e => setForm(p => ({...p, assignedTo: e.target.value}))} placeholder="Team member" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority" value={form.priority} onChange={e => setForm(p => ({...p, priority: e.target.value}))} options={[{ value: 'hot', label: '🔥 Hot' }, { value: 'warm', label: '🌡️ Warm' }, { value: 'cold', label: '❄️ Cold' }]} />
            <Select label="Source" value={form.source} onChange={e => setForm(p => ({...p, source: e.target.value}))} options={[{ value: 'website', label: 'Website' }, { value: 'referral', label: 'Referral' }, { value: 'cold', label: 'Cold Outreach' }, { value: 'social', label: 'Social Media' }, { value: 'event', label: 'Event' }]} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAddLead}><UserPlus className="h-4 w-4" /> Add Lead</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
