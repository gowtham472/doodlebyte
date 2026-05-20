'use client'

import { useState } from 'react'
import { Plus, Star, MessageSquare, ThumbsUp, TrendingUp, Award, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Avatar } from '@/components/ui/Avatar'
import { KPICard } from '@/components/shared/KPICard'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

interface Feedback {
  id: string
  client: string
  project: string
  rating: number
  nps: number
  comment: string
  tags: string[]
  date: Date
  isTestimonial: boolean
  approved: boolean
}

const mockFeedback: Feedback[] = [
  { id: 'fb1', client: 'Rajesh Khanna', project: 'Website Redesign', rating: 5, nps: 10, comment: 'Exceptional work! The team delivered beyond our expectations. The new website has already increased our conversion rate by 40%. Highly professional and responsive throughout the project.', tags: ['on-time', 'high quality', 'great communication'], date: new Date('2026-04-28'), isTestimonial: true, approved: true },
  { id: 'fb2', client: 'Sunita Verma', project: 'Mobile App v2.0', rating: 4, nps: 8, comment: 'Very good experience overall. The app looks great and functions well. Minor delays in the last sprint but the team was transparent about it. Would definitely work with them again.', tags: ['good quality', 'transparent'], date: new Date('2026-05-03'), isTestimonial: false, approved: true },
  { id: 'fb3', client: 'Arjun Mehta', project: 'Brand Identity', rating: 5, nps: 9, comment: 'Loved the creative process. They really understood our brand vision and translated it perfectly. The whole team was a pleasure to work with.', tags: ['creative', 'great team', 'on-time'], date: new Date('2026-05-10'), isTestimonial: true, approved: false },
  { id: 'fb4', client: 'Priya Nair', project: 'ERP Integration', rating: 3, nps: 6, comment: 'The technical work was solid but there were some communication gaps. The final product works as expected but the process could have been smoother.', tags: ['needs improvement', 'technical'], date: new Date('2026-05-15'), isTestimonial: false, approved: true },
]

function StarRating({ rating, max = 5, size = 'sm' }: { rating: number; max?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-3.5 w-3.5', md: 'h-5 w-5', lg: 'h-6 w-6' }
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} className={`${sizes[size]} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  )
}

function NPSBadge({ score }: { score: number }) {
  const variant = score >= 9 ? 'success' : score >= 7 ? 'warning' : 'danger'
  const label = score >= 9 ? 'Promoter' : score >= 7 ? 'Passive' : 'Detractor'
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-bold text-gray-900">{score}/10</span>
      <Badge variant={variant} className="text-xs">{label}</Badge>
    </div>
  )
}

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState(mockFeedback)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ client: '', project: '', rating: '5', nps: '8', comment: '', tags: '' })

  const filtered = feedbackList.filter(f => {
    if (filter === 'testimonials') return f.isTestimonial && f.approved
    if (filter === 'promoters') return f.nps >= 9
    if (filter === 'passives') return f.nps >= 7 && f.nps < 9
    if (filter === 'detractors') return f.nps < 7
    return true
  })

  const avgRating = (feedbackList.reduce((s, f) => s + f.rating, 0) / feedbackList.length).toFixed(1)
  const avgNPS = Math.round(feedbackList.reduce((s, f) => s + f.nps, 0) / feedbackList.length)
  const promoters = feedbackList.filter(f => f.nps >= 9).length
  const detractors = feedbackList.filter(f => f.nps < 7).length
  const npsScore = Math.round(((promoters - detractors) / feedbackList.length) * 100)

  const handleAdd = () => {
    if (!form.client || !form.project || !form.comment) { toast.error('Client, project, and comment are required'); return }
    setFeedbackList(prev => [...prev, {
      id: Date.now().toString(),
      client: form.client,
      project: form.project,
      rating: Number(form.rating),
      nps: Number(form.nps),
      comment: form.comment,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date(),
      isTestimonial: false,
      approved: false,
    }])
    toast.success('Feedback recorded')
    setShowModal(false)
    setForm({ client: '', project: '', rating: '5', nps: '8', comment: '', tags: '' })
  }

  const toggleTestimonial = (id: string) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, isTestimonial: !f.isTestimonial } : f))
    toast.success('Updated')
  }

  const toggleApproval = (id: string) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, approved: !f.approved } : f))
    toast.success('Approval status updated')
  }

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'promoters', label: 'Promoters (9-10)' },
    { key: 'passives', label: 'Passives (7-8)' },
    { key: 'detractors', label: 'Detractors (<7)' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Feedback</h1>
          <p className="text-sm text-gray-500 mt-1">Post-project satisfaction and NPS tracking</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Record Feedback</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Avg Rating" value={`${avgRating}/5`} icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50" />
        <KPICard title="NPS Score" value={String(npsScore)} icon={TrendingUp} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Total Responses" value={String(feedbackList.length)} icon={MessageSquare} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <KPICard title="Testimonials" value={String(feedbackList.filter(f => f.isTestimonial && f.approved).length)} icon={Award} iconColor="text-green-600" iconBg="bg-green-50" />
      </div>

      {/* NPS Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 mb-4">NPS Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Promoters', count: promoters, pct: Math.round((promoters / feedbackList.length) * 100), color: 'bg-green-500' },
            { label: 'Passives', count: feedbackList.filter(f => f.nps >= 7 && f.nps < 9).length, pct: Math.round((feedbackList.filter(f => f.nps >= 7 && f.nps < 9).length / feedbackList.length) * 100), color: 'bg-amber-400' },
            { label: 'Detractors', count: detractors, pct: Math.round((detractors / feedbackList.length) * 100), color: 'bg-red-500' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
              <p className="text-xl font-bold text-gray-900">{item.count}</p>
              <p className="text-xs text-gray-500">{item.label} ({item.pct}%)</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">NPS Score: <span className="font-bold text-blue-600 text-lg">{npsScore}</span> <span className="text-xs">(Promoters% - Detractors%)</span></p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === f.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-200'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filtered.map(fb => (
          <div key={fb.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <Avatar name={fb.client} size="md" />
                <div>
                  <p className="font-semibold text-gray-900">{fb.client}</p>
                  <p className="text-sm text-gray-500">{fb.project}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {fb.isTestimonial && fb.approved && <Badge variant="success" className="text-xs flex items-center gap-1"><Award className="h-3 w-3" /> Testimonial</Badge>}
                {!fb.approved && <Badge variant="warning" className="text-xs">Pending Approval</Badge>}
                <span className="text-xs text-gray-400">{formatDate(fb.date)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Rating</p>
                <StarRating rating={fb.rating} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">NPS</p>
                <NPSBadge score={fb.nps} />
              </div>
            </div>

            <div className="relative mb-3">
              <Quote className="h-6 w-6 text-gray-200 absolute -top-1 -left-1" />
              <p className="text-sm text-gray-700 pl-5 italic">{fb.comment}</p>
            </div>

            {fb.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {fb.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">#{tag}</span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <Button size="sm" variant="ghost" onClick={() => toggleTestimonial(fb.id)} className="text-xs gap-1">
                <Award className="h-3.5 w-3.5" /> {fb.isTestimonial ? 'Remove Testimonial' : 'Mark as Testimonial'}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toggleApproval(fb.id)} className="text-xs gap-1">
                <ThumbsUp className="h-3.5 w-3.5" /> {fb.approved ? 'Unapprove' : 'Approve'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No feedback found</p>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Record Client Feedback">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Client Name" value={form.client} onChange={e => setForm(p => ({...p, client: e.target.value}))} placeholder="e.g. Rajesh Khanna" />
            <Input label="Project" value={form.project} onChange={e => setForm(p => ({...p, project: e.target.value}))} placeholder="e.g. Website Redesign" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Rating (1-5)" value={form.rating} onChange={e => setForm(p => ({...p, rating: e.target.value}))}
              options={[5,4,3,2,1].map(n => ({ value: String(n), label: `${n} Star${n !== 1 ? 's' : ''}` }))} />
            <Select label="NPS Score (0-10)" value={form.nps} onChange={e => setForm(p => ({...p, nps: e.target.value}))}
              options={[10,9,8,7,6,5,4,3,2,1,0].map(n => ({ value: String(n), label: String(n) }))} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Comment / Review</label>
            <textarea value={form.comment} onChange={e => setForm(p => ({...p, comment: e.target.value}))} rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Client's feedback in their own words..." />
          </div>
          <Input label="Tags (comma separated)" value={form.tags} onChange={e => setForm(p => ({...p, tags: e.target.value}))} placeholder="on-time, high quality, great communication" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Save Feedback</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
