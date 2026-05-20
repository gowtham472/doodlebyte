'use client'

import { useState } from 'react'
import { Plus, Users, Briefcase, Clock, Star, Mail, Phone, Search, MoreVertical, UserCheck, UserX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Avatar } from '@/components/ui/Avatar'
import { KPICard } from '@/components/shared/KPICard'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { toast } from 'sonner'

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  employmentType: 'fulltime' | 'parttime' | 'freelancer' | 'intern'
  status: 'active' | 'inactive' | 'onleave'
  skills: string[]
  joinDate: Date
  salary: number
  workload: number // 0-100
  avatar?: string
}

const mockTeam: TeamMember[] = [
  { id: 't1', name: 'Ravi Kumar', email: 'ravi@company.com', phone: '+91 98765 43210', role: 'Full Stack Developer', department: 'Engineering', employmentType: 'fulltime', status: 'active', skills: ['React', 'Node.js', 'Firebase'], joinDate: new Date('2024-01-15'), salary: 85000, workload: 75 },
  { id: 't2', name: 'Priya Sharma', email: 'priya@company.com', phone: '+91 98765 43211', role: 'UI/UX Designer', department: 'Design', employmentType: 'fulltime', status: 'active', skills: ['Figma', 'Adobe XD', 'Tailwind'], joinDate: new Date('2024-02-01'), salary: 75000, workload: 60 },
  { id: 't3', name: 'Amit Patel', email: 'amit@company.com', phone: '+91 98765 43212', role: 'Backend Developer', department: 'Engineering', employmentType: 'fulltime', status: 'active', skills: ['Python', 'PostgreSQL', 'AWS'], joinDate: new Date('2024-03-10'), salary: 90000, workload: 90 },
  { id: 't4', name: 'Sneha Reddy', email: 'sneha@company.com', phone: '+91 98765 43213', role: 'Product Manager', department: 'Product', employmentType: 'fulltime', status: 'onleave', skills: ['Agile', 'Jira', 'Analytics'], joinDate: new Date('2023-11-20'), salary: 95000, workload: 0 },
  { id: 't5', name: 'Karan Mehta', email: 'karan.m@gmail.com', phone: '+91 98765 43214', role: 'Mobile Developer', department: 'Engineering', employmentType: 'freelancer', status: 'active', skills: ['React Native', 'Flutter', 'iOS'], joinDate: new Date('2025-01-05'), salary: 60000, workload: 55 },
  { id: 't6', name: 'Deepika Nair', email: 'deepika@company.com', phone: '+91 98765 43215', role: 'QA Engineer', department: 'Engineering', employmentType: 'fulltime', status: 'active', skills: ['Selenium', 'Cypress', 'Manual Testing'], joinDate: new Date('2024-06-15'), salary: 65000, workload: 40 },
  { id: 't7', name: 'Rohit Joshi', email: 'rohit.j@gmail.com', phone: '+91 98765 43216', role: 'DevOps Engineer', department: 'Infrastructure', employmentType: 'parttime', status: 'active', skills: ['Docker', 'Kubernetes', 'CI/CD'], joinDate: new Date('2025-03-01'), salary: 45000, workload: 35 },
  { id: 't8', name: 'Anjali Singh', email: 'anjali.intern@company.com', phone: '+91 98765 43217', role: 'Frontend Intern', department: 'Engineering', employmentType: 'intern', status: 'active', skills: ['React', 'HTML', 'CSS'], joinDate: new Date('2026-01-10'), salary: 15000, workload: 50 },
]

const deptColors: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-700',
  Design: 'bg-purple-100 text-purple-700',
  Product: 'bg-amber-100 text-amber-700',
  Infrastructure: 'bg-cyan-100 text-cyan-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Sales: 'bg-green-100 text-green-700',
}

const empTypeVariant = (t: string): 'success' | 'info' | 'warning' | 'default' | 'purple' => (
  { fulltime: 'success', parttime: 'info', freelancer: 'warning', intern: 'purple' }[t] as 'success' | 'info' | 'warning' | 'purple' || 'default'
)

const statusVariant = (s: string): 'success' | 'default' | 'warning' => (
  { active: 'success', inactive: 'default', onleave: 'warning' }[s] as 'success' | 'default' | 'warning' || 'default'
)

const statusLabel = (s: string) => ({ active: 'Active', inactive: 'Inactive', onleave: 'On Leave' }[s] || s)

function WorkloadBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-red-500' : value >= 60 ? 'bg-amber-500' : 'bg-green-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{value}%</span>
    </div>
  )
}

export default function TeamPage() {
  const [team, setTeam] = useState(mockTeam)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', department: 'Engineering', employmentType: 'fulltime', salary: '', skills: '' })

  const departments = ['all', ...Array.from(new Set(team.map(m => m.department)))]

  const filtered = team.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'all' || m.department === deptFilter
    return matchSearch && matchDept
  })

  const activeCount = team.filter(m => m.status === 'active').length
  const fulltimeCount = team.filter(m => m.employmentType === 'fulltime').length
  const freelancerCount = team.filter(m => m.employmentType === 'freelancer').length
  const avgWorkload = Math.round(team.filter(m => m.status === 'active').reduce((s, m) => s + m.workload, 0) / (activeCount || 1))

  const handleAdd = () => {
    if (!form.name || !form.email || !form.role) { toast.error('Name, email, and role are required'); return }
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      department: form.department,
      employmentType: form.employmentType as TeamMember['employmentType'],
      status: 'active',
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      joinDate: new Date(),
      salary: Number(form.salary) || 0,
      workload: 0,
    }
    setTeam(prev => [...prev, newMember])
    toast.success(`${form.name} added to team`)
    setShowModal(false)
    setForm({ name: '', email: '', phone: '', role: '', department: 'Engineering', employmentType: 'fulltime', salary: '', skills: '' })
  }

  const handleStatusToggle = (id: string) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m))
    toast.success('Status updated')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and workload</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Add Member</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Members" value={String(team.length)} icon={Users} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Active" value={String(activeCount)} icon={UserCheck} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="Freelancers" value={String(freelancerCount)} icon={Briefcase} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <KPICard title="Avg Workload" value={`${avgWorkload}%`} icon={Clock} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
          <Search className="h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." className="bg-transparent text-sm w-full focus:outline-none" />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {departments.map(d => (
            <button key={d} onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${deptFilter === d ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-200'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(member => (
          <div key={member.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-shadow hover:shadow-md ${member.status === 'inactive' ? 'opacity-60 border-gray-200' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar name={member.name} size="md" />
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <Dropdown trigger={<button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><MoreVertical className="h-4 w-4" /></button>} align="right">
                <DropdownItem onClick={() => toast.info(`Viewing ${member.name}'s profile`)}>View Profile</DropdownItem>
                <DropdownItem onClick={() => toast.info('Opening chat...')}>Send Message</DropdownItem>
                <DropdownItem onClick={() => handleStatusToggle(member.id)}>
                  {member.status === 'active' ? 'Mark Inactive' : 'Mark Active'}
                </DropdownItem>
              </Dropdown>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${deptColors[member.department] || 'bg-gray-100 text-gray-600'}`}>{member.department}</span>
              <Badge variant={empTypeVariant(member.employmentType)} className="text-xs capitalize">{member.employmentType}</Badge>
              <Badge variant={statusVariant(member.status)} className="text-xs">{statusLabel(member.status)}</Badge>
            </div>

            <div className="space-y-1.5 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{member.email}</div>
              {member.phone && <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{member.phone}</div>}
            </div>

            {member.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {member.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{s}</span>
                ))}
                {member.skills.length > 3 && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">+{member.skills.length - 3}</span>}
              </div>
            )}

            <div>
              <p className="text-xs text-gray-500 mb-1">Workload</p>
              <WorkloadBar value={member.workload} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No members found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Team Member">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="e.g. John Doe" />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="john@company.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="+91 98765 43210" />
            <Input label="Role / Job Title" value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} placeholder="e.g. Frontend Developer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Department" value={form.department} onChange={e => setForm(p => ({...p, department: e.target.value}))}
              options={['Engineering', 'Design', 'Product', 'Infrastructure', 'Marketing', 'Sales'].map(d => ({ value: d, label: d }))} />
            <Select label="Employment Type" value={form.employmentType} onChange={e => setForm(p => ({...p, employmentType: e.target.value}))}
              options={[{ value: 'fulltime', label: 'Full Time' }, { value: 'parttime', label: 'Part Time' }, { value: 'freelancer', label: 'Freelancer' }, { value: 'intern', label: 'Intern' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Monthly Salary (₹)" type="number" value={form.salary} onChange={e => setForm(p => ({...p, salary: e.target.value}))} placeholder="0" />
            <Input label="Skills (comma separated)" value={form.skills} onChange={e => setForm(p => ({...p, skills: e.target.value}))} placeholder="React, Node.js, AWS" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Member</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
