'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Briefcase, Search, Calendar, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { KPICard } from '@/components/shared/KPICard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

type ProjectStatus = 'planning' | 'inprogress' | 'review' | 'onhold' | 'completed' | 'cancelled'
interface Project { id: string; name: string; client: string; status: ProjectStatus; budget: number; actualCost: number; deadline: Date; team: string[]; type: string; progress: number }

const mockProjects: Project[] = [
  { id: 'p1', name: 'Website Redesign', client: 'Acme Corp', status: 'inprogress', budget: 250000, actualCost: 110000, deadline: new Date('2026-06-30'), team: ['Ravi', 'Priya'], type: 'service', progress: 45 },
  { id: 'p2', name: 'Mobile App v2.0', client: 'TechStart Inc', status: 'review', budget: 450000, actualCost: 380000, deadline: new Date('2026-05-25'), team: ['Dev1', 'Dev2', 'Designer'], type: 'product', progress: 85 },
  { id: 'p3', name: 'ERP Integration', client: 'Global Solutions', status: 'planning', budget: 180000, actualCost: 12000, deadline: new Date('2026-08-15'), team: ['Ravi'], type: 'service', progress: 8 },
  { id: 'p4', name: 'E-commerce Platform', client: 'Innovate Labs', status: 'onhold', budget: 320000, actualCost: 145000, deadline: new Date('2026-07-01'), team: ['Dev1', 'Priya'], type: 'product', progress: 40 },
  { id: 'p5', name: 'Brand Identity', client: 'Digital Wave', status: 'completed', budget: 85000, actualCost: 82000, deadline: new Date('2026-04-30'), team: ['Designer'], type: 'service', progress: 100 },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' }> = {
  planning: { label: 'Planning', variant: 'info' },
  inprogress: { label: 'In Progress', variant: 'warning' },
  review: { label: 'Review', variant: 'purple' },
  onhold: { label: 'On Hold', variant: 'default' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', client: '', type: 'service', budget: '', deadline: '', billingType: 'fixed' })

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  const activeCount = projects.filter(p => ['inprogress', 'review'].includes(p.status)).length
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0)
  const completedCount = projects.filter(p => p.status === 'completed').length

  const handleAdd = () => {
    if (!form.name || !form.client) { toast.error('Name and client required'); return }
    setProjects(prev => [...prev, { id: Date.now().toString(), name: form.name, client: form.client, status: 'planning', budget: Number(form.budget) || 0, actualCost: 0, deadline: new Date(form.deadline || Date.now() + 2592000000), team: [], type: form.type, progress: 0 }])
    toast.success('Project created')
    setShowModal(false)
    setForm({ name: '', client: '', type: 'service', budget: '', deadline: '', billingType: 'fixed' })
  }

  const FILTERS = ['all', 'planning', 'inprogress', 'review', 'onhold', 'completed']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all client projects and deliverables</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Project</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Active Projects" value={String(activeCount)} icon={Briefcase} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Total Budget" value={formatCurrency(totalBudget)} icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="Completed" value={String(completedCount)} icon={Briefcase} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-3 py-2 w-full sm:max-w-xs">
            <Search className="h-4 w-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="bg-transparent text-sm w-full focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 w-full sm:w-auto">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map(project => {
            const budgetPct = Math.min((project.actualCost / project.budget) * 100, 100)
            const overBudget = project.actualCost > project.budget * 0.8
            return (
              <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/dashboard/projects/${project.id}`} className="font-semibold text-gray-900 hover:text-blue-600 hover:underline">{project.name}</Link>
                      <Badge variant={statusConfig[project.status].variant}>{statusConfig[project.status].label}</Badge>
                      <Badge variant="default">{project.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{project.client}</p>

                    {/* Progress bar */}
                    <div className="mt-3 max-w-xs">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span><span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-500"><Calendar className="h-3.5 w-3.5" />{formatDate(project.deadline)}</span>
                      <span className="flex items-center gap-1.5 text-gray-500"><Users className="h-3.5 w-3.5" />{project.team.length}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${overBudget ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatCurrency(project.actualCost)} / {formatCurrency(project.budget)}
                      </p>
                      <div className="mt-1 h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${budgetPct >= 100 ? 'bg-red-500' : budgetPct >= 80 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${budgetPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Project">
        <div className="space-y-4">
          <Input label="Project Name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="e.g. Website Redesign" />
          <Input label="Client" value={form.client} onChange={e => setForm(p => ({...p, client: e.target.value}))} placeholder="e.g. Acme Corp" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} options={[{ value: 'service', label: 'Service' }, { value: 'product', label: 'Product' }]} />
            <Select label="Billing" value={form.billingType} onChange={e => setForm(p => ({...p, billingType: e.target.value}))} options={[{ value: 'fixed', label: 'Fixed Price' }, { value: 'hourly', label: 'Hourly' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Budget (₹)" type="number" value={form.budget} onChange={e => setForm(p => ({...p, budget: e.target.value}))} placeholder="0" />
            <Input label="Deadline" type="date" value={form.deadline} onChange={e => setForm(p => ({...p, deadline: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
