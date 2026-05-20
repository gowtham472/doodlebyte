'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Clock, Timer, CheckCircle2, Circle, CircleDot, Milestone, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done'
type Priority = 'low' | 'medium' | 'high'
interface Task { id: string; title: string; status: TaskStatus; priority: Priority; assignedTo: string; estimatedHours: number; loggedHours: number; dueDate?: Date }

const TASK_STATUSES: { key: TaskStatus; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'todo', label: 'To Do', icon: Circle, color: 'text-gray-400' },
  { key: 'inprogress', label: 'In Progress', icon: CircleDot, color: 'text-blue-500' },
  { key: 'review', label: 'Review', icon: CircleDot, color: 'text-purple-500' },
  { key: 'done', label: 'Done', icon: CheckCircle2, color: 'text-green-500' },
]

const mockProject = {
  id: 'p1', name: 'Website Redesign', client: 'Acme Corp', status: 'inprogress',
  budget: 250000, actualCost: 110000, startDate: new Date('2026-04-01'), deadline: new Date('2026-06-30'),
  team: ['Ravi', 'Priya', 'Designer1'], description: 'Complete redesign of the Acme Corp corporate website with modern UI/UX.',
  milestones: [
    { id: 'm1', title: 'Design Mockups Approved', dueDate: new Date('2026-04-30'), status: 'completed' },
    { id: 'm2', title: 'Frontend Development', dueDate: new Date('2026-05-31'), status: 'pending' },
    { id: 'm3', title: 'QA & Testing', dueDate: new Date('2026-06-20'), status: 'pending' },
  ],
}

const mockTasks: Task[] = [
  { id: 't1', title: 'Create homepage wireframes', status: 'done', priority: 'high', assignedTo: 'Priya', estimatedHours: 8, loggedHours: 7.5 },
  { id: 't2', title: 'Build navigation component', status: 'inprogress', priority: 'high', assignedTo: 'Ravi', estimatedHours: 12, loggedHours: 5 },
  { id: 't3', title: 'Implement responsive grid', status: 'inprogress', priority: 'medium', assignedTo: 'Ravi', estimatedHours: 6, loggedHours: 2 },
  { id: 't4', title: 'Design system setup', status: 'done', priority: 'medium', assignedTo: 'Designer1', estimatedHours: 10, loggedHours: 10 },
  { id: 't5', title: 'Contact form integration', status: 'todo', priority: 'low', assignedTo: 'Ravi', estimatedHours: 4, loggedHours: 0 },
  { id: 't6', title: 'SEO meta tags', status: 'review', priority: 'low', assignedTo: 'Priya', estimatedHours: 3, loggedHours: 3 },
]

const TABS = ['Overview', 'Tasks', 'Milestones', 'Time Log']

export default function ProjectDetailPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState(mockTasks)
  const [tab, setTab] = useState('Tasks')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [kanbanView, setKanbanView] = useState(true)
  const [form, setForm] = useState({ title: '', priority: 'medium', assignedTo: '', estimatedHours: '' })

  const totalHours = tasks.reduce((s, t) => s + t.loggedHours, 0)
  const completedTasks = tasks.filter(t => t.status === 'done').length

  const handleAddTask = () => {
    if (!form.title) { toast.error('Task title required'); return }
    setTasks(prev => [...prev, { id: Date.now().toString(), title: form.title, status: 'todo', priority: form.priority as Priority, assignedTo: form.assignedTo, estimatedHours: Number(form.estimatedHours) || 0, loggedHours: 0 }])
    toast.success('Task added')
    setShowTaskModal(false)
    setForm({ title: '', priority: 'medium', assignedTo: '', estimatedHours: '' })
  }

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  const priorityColor = (p: string) => ({ high: 'text-red-500', medium: 'text-amber-500', low: 'text-green-500' }[p] || 'text-gray-400')
  const budgetPct = Math.min((mockProject.actualCost / mockProject.budget) * 100, 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="h-5 w-5" /></button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{mockProject.name}</h1>
            <Badge variant="warning">In Progress</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{mockProject.client} · Due {formatDate(mockProject.deadline)}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Budget</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(mockProject.budget)}</p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${budgetPct >= 80 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${budgetPct}%` }} /></div>
          <p className="text-xs text-gray-500 mt-1">Spent: {formatCurrency(mockProject.actualCost)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Tasks</p>
          <p className="text-lg font-bold text-gray-900">{completedTasks}/{tasks.length}</p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${(completedTasks / tasks.length) * 100}%` }} /></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Hours Logged</p>
          <p className="text-lg font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Team Size</p>
          <p className="text-lg font-bold text-gray-900">{mockProject.team.length}</p>
          <div className="flex -space-x-1 mt-2">
            {mockProject.team.slice(0, 3).map(m => (
              <div key={m} className="h-6 w-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">{m[0]}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4">
          <div className="flex">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>{t}</button>
            ))}
          </div>
          {tab === 'Tasks' && (
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button onClick={() => setKanbanView(true)} className={`px-3 py-1.5 text-xs font-medium ${kanbanView ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>Board</button>
                <button onClick={() => setKanbanView(false)} className={`px-3 py-1.5 text-xs font-medium ${!kanbanView ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>List</button>
              </div>
              <Button size="sm" onClick={() => setShowTaskModal(true)}><Plus className="h-4 w-4" /> Task</Button>
            </div>
          )}
        </div>

        <div className="p-5">
          {tab === 'Overview' && (
            <div className="space-y-4 text-sm text-gray-700">
              <p>{mockProject.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Start Date</p><p className="font-medium">{formatDate(mockProject.startDate)}</p></div>
                <div><p className="text-xs text-gray-500">Deadline</p><p className="font-medium">{formatDate(mockProject.deadline)}</p></div>
              </div>
            </div>
          )}

          {tab === 'Tasks' && (
            kanbanView ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {TASK_STATUSES.map(col => {
                  const colTasks = tasks.filter(t => t.status === col.key)
                  const Icon = col.icon
                  return (
                    <div key={col.key} className="flex-shrink-0 w-60 bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`h-4 w-4 ${col.color}`} />
                        <span className="font-semibold text-sm text-gray-700">{col.label}</span>
                        <Badge>{colTasks.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {colTasks.map(task => (
                          <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                            <p className="font-medium text-sm text-gray-900 mb-1">{task.title}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className={`font-medium ${priorityColor(task.priority)} capitalize`}>{task.priority}</span>
                              <span>{task.assignedTo || 'Unassigned'}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <Clock className="h-3 w-3" />{task.loggedHours}h / {task.estimatedHours}h
                            </div>
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {TASK_STATUSES.filter(s => s.key !== col.key).map(s => (
                                <button key={s.key} onClick={() => moveTask(task.id, s.key)} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 transition-colors">
                                  → {s.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    {['Task', 'Status', 'Priority', 'Assigned To', 'Hours', 'Actions'].map(h => <th key={h} className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {tasks.map(task => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 font-medium text-gray-900">{task.title}</td>
                        <td className="px-3 py-3"><Badge>{task.status}</Badge></td>
                        <td className="px-3 py-3"><span className={`text-xs font-medium capitalize ${priorityColor(task.priority)}`}>{task.priority}</span></td>
                        <td className="px-3 py-3 text-gray-600">{task.assignedTo || '—'}</td>
                        <td className="px-3 py-3 text-gray-600">{task.loggedHours}h / {task.estimatedHours}h</td>
                        <td className="px-3 py-3">
                          <Select value={task.status} onChange={e => moveTask(task.id, e.target.value as TaskStatus)} options={TASK_STATUSES.map(s => ({ value: s.key, label: s.label }))} className="h-7 text-xs" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {tab === 'Milestones' && (
            <div className="space-y-3">
              {mockProject.milestones.map(m => (
                <div key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border ${m.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${m.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {m.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-white" /> : <Milestone className="h-4 w-4 text-gray-500" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${m.status === 'completed' ? 'text-green-800 line-through' : 'text-gray-900'}`}>{m.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Due: {formatDate(m.dueDate)}</p>
                  </div>
                  <Badge variant={m.status === 'completed' ? 'success' : 'default'}>{m.status}</Badge>
                </div>
              ))}
            </div>
          )}

          {tab === 'Time Log' && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button size="sm"><Clock className="h-4 w-4" /> Log Time</Button>
              </div>
              <div className="text-sm text-gray-600">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="font-semibold text-blue-900">Total: {totalHours.toFixed(1)} hours logged</p>
                  <p className="text-blue-700 text-xs mt-1">Billable hours will appear here once time entries are added.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={showTaskModal} onClose={() => setShowTaskModal(false)} title="Add Task">
        <div className="space-y-4">
          <Input label="Task Title" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Build login page" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority" value={form.priority} onChange={e => setForm(p => ({...p, priority: e.target.value}))} options={[{ value: 'high', label: '🔴 High' }, { value: 'medium', label: '🟡 Medium' }, { value: 'low', label: '🟢 Low' }]} />
            <Input label="Assign To" value={form.assignedTo} onChange={e => setForm(p => ({...p, assignedTo: e.target.value}))} placeholder="Team member" />
          </div>
          <Input label="Estimated Hours" type="number" value={form.estimatedHours} onChange={e => setForm(p => ({...p, estimatedHours: e.target.value}))} placeholder="e.g. 8" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowTaskModal(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
