'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ArrowLeft, Send, Download, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

interface LineItem { id: string; description: string; qty: number; unitPrice: number; discount: number; taxRate: number }

const calcTotal = (item: LineItem) => {
  const subtotal = item.qty * item.unitPrice
  const discountAmt = subtotal * (item.discount / 100)
  const taxableAmt = subtotal - discountAmt
  const taxAmt = taxableAmt * (item.taxRate / 100)
  return taxableAmt + taxAmt
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [client, setClient] = useState('')
  const [invoiceNum, setInvoiceNum] = useState(`INV-${String(Date.now()).slice(-4)}`)
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentTerms, setPaymentTerms] = useState('30')
  const [notes, setNotes] = useState('')
  const [terms, setTerms] = useState('Payment is due within the specified payment terms.')
  const [items, setItems] = useState<LineItem[]>([{ id: '1', description: '', qty: 1, unitPrice: 0, discount: 0, taxRate: 18 }])
  const [saving, setSaving] = useState(false)

  const dueDate = new Date(new Date(issueDate).getTime() + Number(paymentTerms) * 86400000).toISOString().split('T')[0]

  const addItem = () => setItems(p => [...p, { id: Date.now().toString(), description: '', qty: 1, unitPrice: 0, discount: 0, taxRate: 18 }])
  const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id))
  const updateItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems(p => p.map(i => i.id === id ? { ...i, [field]: field === 'description' ? value : Number(value) } : i))

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0)
  const discountTotal = items.reduce((s, i) => s + i.qty * i.unitPrice * (i.discount / 100), 0)
  const taxTotal = items.reduce((s, i) => { const sub = i.qty * i.unitPrice * (1 - i.discount / 100); return s + sub * (i.taxRate / 100) }, 0)
  const grandTotal = subtotal - discountTotal + taxTotal

  const handleSave = async (send = false) => {
    if (!client) { toast.error('Client name is required'); return }
    if (items.some(i => !i.description)) { toast.error('All line items need a description'); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success(send ? 'Invoice sent to client!' : 'Invoice saved as draft')
    router.push('/dashboard/finance/invoices')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="h-5 w-5" /></button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Invoice</h1>
            <p className="text-sm text-gray-500 mt-0.5">Create and send invoice to client</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Preview PDF</Button>
          <Button variant="secondary" size="sm" loading={saving} onClick={() => handleSave(false)}><Save className="h-4 w-4" /> Save Draft</Button>
          <Button size="sm" loading={saving} onClick={() => handleSave(true)}><Send className="h-4 w-4" /> Send</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h2 className="font-semibold text-gray-900">Invoice Details</h2>
          <Input label="Invoice Number" value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} />
          <Input label="Client Name" value={client} onChange={e => setClient(e.target.value)} placeholder="e.g. Acme Corp" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Issue Date" type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
            <Select label="Payment Terms" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} options={[{ value: '7', label: 'Net 7' }, { value: '15', label: 'Net 15' }, { value: '30', label: 'Net 30' }, { value: '45', label: 'Net 45' }, { value: '60', label: 'Net 60' }]} />
          </div>
          <Input label="Due Date (auto-calculated)" value={dueDate} readOnly className="bg-gray-50" />
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
          <h2 className="font-semibold text-gray-900">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Discount</span><span>- {formatCurrency(discountTotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax (GST)</span><span>+ {formatCurrency(taxTotal)}</span></div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>Grand Total</span><span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Line Items</h2>
          <Button variant="outline" size="sm" onClick={addItem}><Plus className="h-4 w-4" /> Add Item</Button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase px-1">
            <span className="col-span-4">Description</span>
            <span className="col-span-1">Qty</span>
            <span className="col-span-2">Unit Price</span>
            <span className="col-span-2">Discount %</span>
            <span className="col-span-1">Tax %</span>
            <span className="col-span-1 text-right">Total</span>
            <span className="col-span-1"></span>
          </div>
          {items.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4"><input value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="Item description" className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div className="col-span-1"><input type="number" value={item.qty} min={1} onChange={e => updateItem(item.id, 'qty', e.target.value)} className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div className="col-span-2"><input type="number" value={item.unitPrice} min={0} onChange={e => updateItem(item.id, 'unitPrice', e.target.value)} className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div className="col-span-2"><input type="number" value={item.discount} min={0} max={100} onChange={e => updateItem(item.id, 'discount', e.target.value)} className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div className="col-span-1"><input type="number" value={item.taxRate} min={0} max={100} onChange={e => updateItem(item.id, 'taxRate', e.target.value)} className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div className="col-span-1 text-right text-sm font-medium text-gray-900">{formatCurrency(calcTotal(item))}</div>
              <div className="col-span-1 flex justify-end">
                {items.length > 1 && <button onClick={() => removeItem(item.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes & Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes to Client</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Thank you for your business!" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
          <textarea value={terms} onChange={e => setTerms(e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  )
}
