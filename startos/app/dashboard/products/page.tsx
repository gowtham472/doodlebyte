'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Package, AppWindow, Smartphone, Gamepad2, Globe, Search, Bug, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { KPICard } from '@/components/shared/KPICard'
import { toast } from 'sonner'

type ProductType = 'webapp' | 'mobileapp' | 'game' | 'website' | 'saas' | 'other'
interface Product { id: string; name: string; type: ProductType; description: string; status: string; liveUrl: string; version: string; feedbackCount: number; techStack: string[] }

const TypeIcon = ({ type }: { type: string }) => {
  const icons = { webapp: AppWindow, mobileapp: Smartphone, game: Gamepad2, website: Globe, saas: AppWindow, other: Package }
  const Icon = icons[type as keyof typeof icons] || Package
  return <Icon className="h-5 w-5" />
}

const typeColors: Record<string, string> = { webapp: 'bg-blue-100 text-blue-600', mobileapp: 'bg-purple-100 text-purple-600', game: 'bg-pink-100 text-pink-600', website: 'bg-cyan-100 text-cyan-600', saas: 'bg-indigo-100 text-indigo-600', other: 'bg-gray-100 text-gray-600' }

const mockProducts: Product[] = [
  { id: 'prod1', name: 'FinTrack App', type: 'mobileapp', description: 'Personal finance tracking mobile application with AI insights', status: 'live', liveUrl: 'https://play.google.com', version: '2.1.0', feedbackCount: 24, techStack: ['React Native', 'Firebase', 'Node.js'] },
  { id: 'prod2', name: 'StartOS', type: 'saas', description: 'Complete startup management platform (this app!)', status: 'beta', liveUrl: 'https://startos.app', version: '1.0.0-beta', feedbackCount: 8, techStack: ['Next.js', 'Firebase', 'Tailwind'] },
  { id: 'prod3', name: 'ShopBuilder', type: 'webapp', description: 'No-code e-commerce website builder for small businesses', status: 'development', liveUrl: '', version: '0.5.0', feedbackCount: 3, techStack: ['React', 'Node.js', 'PostgreSQL'] },
  { id: 'prod4', name: 'PixelHero', type: 'game', description: '2D platformer game with procedural level generation', status: 'planning', liveUrl: '', version: '0.1.0', feedbackCount: 0, techStack: ['Unity', 'C#'] },
]

const statusVariant = (s: string): 'success' | 'warning' | 'info' | 'default' => ({ live: 'success', beta: 'warning', development: 'info', planning: 'default' }[s] as 'success' | 'warning' | 'info' | 'default' || 'default')

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'webapp', description: '', liveUrl: '' })

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = () => {
    if (!form.name) { toast.error('Product name required'); return }
    setProducts(prev => [...prev, { id: Date.now().toString(), name: form.name, type: form.type as ProductType, description: form.description, status: 'planning', liveUrl: form.liveUrl, version: '0.1.0', feedbackCount: 0, techStack: [] }])
    toast.success('Product added')
    setShowModal(false)
    setForm({ name: '', type: 'webapp', description: '', liveUrl: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product portfolio</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Product</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Products" value={String(products.length)} icon={Package} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Live" value={String(products.filter(p => p.status === 'live').length)} icon={Globe} iconColor="text-green-600" iconBg="bg-green-50" />
        <KPICard title="In Development" value={String(products.filter(p => p.status === 'development').length)} icon={AppWindow} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <KPICard title="Open Feedback" value={String(products.reduce((s, p) => s + p.feedbackCount, 0))} icon={Bug} iconColor="text-red-600" iconBg="bg-red-50" />
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-xs">
        <Search className="h-4 w-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="bg-transparent text-sm w-full focus:outline-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${typeColors[product.type]}`}>
                <TypeIcon type={product.type} />
              </div>
              <Badge variant={statusVariant(product.status)}>{product.status}</Badge>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {product.techStack.slice(0, 3).map(t => <Badge key={t} className="text-xs">{t}</Badge>)}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>v{product.version}</span>
              <span className="flex items-center gap-1"><Bug className="h-3 w-3" />{product.feedbackCount} issues</span>
            </div>
            <Link href={`/dashboard/products/${product.id}`}>
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </Link>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Product">
        <div className="space-y-4">
          <Input label="Product Name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="e.g. My SaaS App" />
          <Select label="Type" value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} options={[{ value: 'webapp', label: 'Web App' }, { value: 'mobileapp', label: 'Mobile App' }, { value: 'saas', label: 'SaaS' }, { value: 'website', label: 'Website' }, { value: 'game', label: 'Game' }, { value: 'other', label: 'Other' }]} />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="What does this product do?" />
          </div>
          <Input label="Live URL (optional)" value={form.liveUrl} onChange={e => setForm(p => ({...p, liveUrl: e.target.value}))} placeholder="https://..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Create Product</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
