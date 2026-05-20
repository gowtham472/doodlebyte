'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Bug, Lightbulb, Tag, ThumbsUp, Globe, GitBranch, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const mockProduct = {
  id: 'prod1', name: 'FinTrack App', type: 'mobileapp', status: 'live', version: '2.1.0',
  description: 'Personal finance tracking mobile application with AI insights and budget planning.',
  liveUrl: 'https://play.google.com', techStack: ['React Native', 'Firebase', 'Node.js'],
  versions: [
    { id: 'v1', version: '2.1.0', type: 'minor', releaseDate: new Date('2026-05-01'), status: 'released', changelog: { added: ['AI spending insights', 'Budget alerts'], fixed: ['Login crash on Android 14'], removed: [] } },
    { id: 'v2', version: '2.0.0', type: 'major', releaseDate: new Date('2026-03-15'), status: 'released', changelog: { added: ['Redesigned UI', 'Multi-currency support'], fixed: ['Performance improvements'], removed: ['Legacy reports module'] } },
    { id: 'v3', version: '2.2.0', type: 'minor', releaseDate: new Date('2026-06-15'), status: 'upcoming', changelog: { added: ['Investment tracking', 'Export to PDF'], fixed: [], removed: [] } },
  ],
  feedback: [
    { id: 'f1', type: 'bug', title: 'App crashes on iOS 17.4', severity: 'high', status: 'inprogress', upvotes: 8, submittedBy: 'User123', date: new Date('2026-05-10') },
    { id: 'f2', type: 'feature', title: 'Add dark mode support', severity: null, status: 'acknowledged', upvotes: 34, submittedBy: 'PowerUser', date: new Date('2026-05-05') },
    { id: 'f3', type: 'bug', title: 'Sync not working on slow networks', severity: 'medium', status: 'new', upvotes: 5, submittedBy: 'Beta42', date: new Date('2026-05-12') },
    { id: 'f4', type: 'feature', title: 'Export transactions to Excel', severity: null, status: 'resolved', upvotes: 22, submittedBy: 'Finance_Pro', date: new Date('2026-04-28') },
  ],
}

const TABS = ['Overview', 'Versions', 'Feedback']

export default function ProductDetailPage() {
  const router = useRouter()
  const [product] = useState(mockProduct)
  const [tab, setTab] = useState('Overview')
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({ type: 'bug', title: '', description: '', severity: 'medium' })
  const [feedback, setFeedback] = useState(product.feedback)

  const handleSubmitFeedback = () => {
    if (!feedbackForm.title) { toast.error('Title required'); return }
    setFeedback(prev => [...prev, { id: Date.now().toString(), type: feedbackForm.type, title: feedbackForm.title, severity: feedbackForm.type === 'bug' ? feedbackForm.severity : null, status: 'new', upvotes: 0, submittedBy: 'You', date: new Date() }])
    toast.success('Feedback submitted')
    setShowFeedbackModal(false)
    setFeedbackForm({ type: 'bug', title: '', description: '', severity: 'medium' })
  }

  const versionTypeColor = (t: string) => ({ major: 'danger', minor: 'info', patch: 'default', hotfix: 'warning' }[t] as 'danger' | 'info' | 'default' | 'warning' || 'default')
  const feedbackStatusVariant = (s: string) => ({ new: 'info', acknowledged: 'warning', inprogress: 'purple', resolved: 'success', declined: 'danger' }[s] as 'info' | 'warning' | 'purple' | 'success' | 'danger' || 'default')
  const severityColor = (s: string | null) => ({ critical: 'text-red-600', high: 'text-orange-600', medium: 'text-amber-600', low: 'text-green-600' }[s || ''] || 'text-gray-500')

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="h-5 w-5" /></button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <Badge variant="success">{product.status}</Badge>
            <Badge variant="info">v{product.version}</Badge>
          </div>
          {product.liveUrl && (
            <a href={product.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-0.5">
              <Globe className="h-3.5 w-3.5" /> {product.liveUrl}
            </a>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4">
          <div className="flex">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>{t}</button>
            ))}
          </div>
          {tab === 'Feedback' && (
            <Button size="sm" onClick={() => setShowFeedbackModal(true)}><Plus className="h-4 w-4" /> Report</Button>
          )}
        </div>

        <div className="p-5">
          {tab === 'Overview' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">{product.description}</p>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Tech Stack</p>
                <div className="flex gap-2 flex-wrap">
                  {product.techStack.map(t => <Badge key={t} variant="info">{t}</Badge>)}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Versions</p><p className="text-xl font-bold text-gray-900">{product.versions.length}</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Open Issues</p><p className="text-xl font-bold text-red-600">{feedback.filter(f => f.type === 'bug' && f.status !== 'resolved' && f.status !== 'declined').length}</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Feature Requests</p><p className="text-xl font-bold text-blue-600">{feedback.filter(f => f.type === 'feature').length}</p></div>
              </div>
            </div>
          )}

          {tab === 'Versions' && (
            <div className="space-y-4">
              {product.versions.map(v => (
                <div key={v.id} className={`border rounded-xl p-4 ${v.status === 'upcoming' ? 'border-dashed border-blue-300 bg-blue-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="font-bold text-gray-900">v{v.version}</span>
                      <Badge variant={versionTypeColor(v.type)}>{v.type}</Badge>
                      {v.status === 'upcoming' && <Badge variant="info">Upcoming</Badge>}
                      {v.status === 'released' && <Badge variant="success">Released</Badge>}
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(v.releaseDate)}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    {v.changelog.added.length > 0 && (
                      <div>
                        <p className="font-medium text-green-700 mb-1">✨ Added</p>
                        <ul className="space-y-0.5">{v.changelog.added.map(a => <li key={a} className="text-gray-600 text-xs">• {a}</li>)}</ul>
                      </div>
                    )}
                    {v.changelog.fixed.length > 0 && (
                      <div>
                        <p className="font-medium text-blue-700 mb-1">🔧 Fixed</p>
                        <ul className="space-y-0.5">{v.changelog.fixed.map(f => <li key={f} className="text-gray-600 text-xs">• {f}</li>)}</ul>
                      </div>
                    )}
                    {v.changelog.removed.length > 0 && (
                      <div>
                        <p className="font-medium text-red-700 mb-1">🗑 Removed</p>
                        <ul className="space-y-0.5">{v.changelog.removed.map(r => <li key={r} className="text-gray-600 text-xs">• {r}</li>)}</ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Feedback' && (
            <div className="space-y-3">
              {feedback.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                  <div className={`p-2 rounded-lg ${item.type === 'bug' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    {item.type === 'bug' ? <Bug className={`h-4 w-4 ${item.severity === 'high' || item.severity === 'critical' ? 'text-red-600' : 'text-orange-500'}`} /> : <Lightbulb className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm text-gray-900">{item.title}</p>
                      <Badge variant={feedbackStatusVariant(item.status)}>{item.status}</Badge>
                      {item.severity && <span className={`text-xs font-medium capitalize ${severityColor(item.severity)}`}>{item.severity}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.submittedBy} · {formatDate(item.date)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ThumbsUp className="h-3.5 w-3.5" />{item.upvotes}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} title="Submit Feedback">
        <div className="space-y-4">
          <Select label="Type" value={feedbackForm.type} onChange={e => setFeedbackForm(p => ({...p, type: e.target.value}))} options={[{ value: 'bug', label: '🐛 Bug Report' }, { value: 'feature', label: '💡 Feature Request' }, { value: 'general', label: '💬 General Feedback' }]} />
          <Input label="Title" value={feedbackForm.title} onChange={e => setFeedbackForm(p => ({...p, title: e.target.value}))} placeholder="Brief description" />
          {feedbackForm.type === 'bug' && (
            <Select label="Severity" value={feedbackForm.severity} onChange={e => setFeedbackForm(p => ({...p, severity: e.target.value}))} options={[{ value: 'critical', label: 'Critical' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} />
          )}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={feedbackForm.description} onChange={e => setFeedbackForm(p => ({...p, description: e.target.value}))} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed description..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>Cancel</Button>
            <Button onClick={handleSubmitFeedback}>Submit</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
