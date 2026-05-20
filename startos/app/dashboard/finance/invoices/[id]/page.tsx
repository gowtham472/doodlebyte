'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Send, Download, Copy, CheckCircle2, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

const mockInvoice = {
  id: 'INV-001', client: 'Acme Corp', clientEmail: 'billing@acme.com',
  amount: 85000, issued: new Date('2026-05-01'), due: new Date('2026-05-31'), status: 'sent',
  lineItems: [
    { id: '1', description: 'UI/UX Design - Phase 1', qty: 1, unitPrice: 50000, discount: 0, taxRate: 18 },
    { id: '2', description: 'Frontend Development', qty: 1, unitPrice: 35000, discount: 5, taxRate: 18 },
  ],
  payments: [] as { amount: number; date: Date; method: string; reference: string }[],
  notes: 'Thank you for choosing StartOS!',
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [invoice, setInvoice] = useState(mockInvoice)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [payment, setPayment] = useState({ amount: '', method: 'bank', reference: '', date: new Date().toISOString().split('T')[0] })

  const subtotal = invoice.lineItems.reduce((s, i) => s + i.qty * i.unitPrice, 0)
  const discountTotal = invoice.lineItems.reduce((s, i) => s + i.qty * i.unitPrice * (i.discount / 100), 0)
  const taxTotal = invoice.lineItems.reduce((s, i) => { const sub = i.qty * i.unitPrice * (1 - i.discount / 100); return s + sub * (i.taxRate / 100) }, 0)
  const grandTotal = subtotal - discountTotal + taxTotal
  const paidAmount = invoice.payments.reduce((s, p) => s + p.amount, 0)

  const statusVariant = (s: string) => ({ paid: 'success', overdue: 'danger', partialpaid: 'warning', sent: 'info', viewed: 'info', draft: 'default' }[s] as 'success' | 'danger' | 'warning' | 'info' | 'default' || 'default')

  const handleRecordPayment = () => {
    if (!payment.amount) { toast.error('Enter payment amount'); return }
    const newPayments = [...invoice.payments, { amount: Number(payment.amount), date: new Date(payment.date), method: payment.method, reference: payment.reference }]
    const newPaid = newPayments.reduce((s, p) => s + p.amount, 0)
    const newStatus = newPaid >= grandTotal ? 'paid' : 'partialpaid'
    setInvoice(p => ({ ...p, payments: newPayments, status: newStatus }))
    toast.success('Payment recorded')
    setShowPaymentModal(false)
    setPayment({ amount: '', method: 'bank', reference: '', date: new Date().toISOString().split('T')[0] })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="h-5 w-5" /></button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Invoice {params.id}</h1>
              <Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{invoice.client} · {formatDate(invoice.issued)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> PDF</Button>
          <Button variant="outline" size="sm"><Copy className="h-4 w-4" /> Duplicate</Button>
          {invoice.status !== 'paid' && (
            <>
              <Button variant="secondary" size="sm" onClick={() => { setInvoice(p => ({...p, status: 'sent'})); toast.success('Invoice sent!') }}><Send className="h-4 w-4" /> Send</Button>
              <Button size="sm" onClick={() => setShowPaymentModal(true)}><DollarSign className="h-4 w-4" /> Record Payment</Button>
            </>
          )}
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Your Company</p>
                <p className="text-xs text-gray-500">company@domain.com</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{invoice.id}</p>
            <p className="text-sm text-gray-500 mt-1">Issued: {formatDate(invoice.issued)}</p>
            <p className="text-sm text-gray-500">Due: {formatDate(invoice.due)}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Bill To</p>
          <p className="font-semibold text-gray-900">{invoice.client}</p>
          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
        </div>

        <table className="w-full text-sm mb-6">
          <thead><tr className="border-b-2 border-gray-200">
            {['Description', 'Qty', 'Unit Price', 'Discount', 'Tax', 'Total'].map(h => <th key={h} className="py-2 text-left font-medium text-gray-600">{h}</th>)}
          </tr></thead>
          <tbody>
            {invoice.lineItems.map(item => {
              const itemTotal = item.qty * item.unitPrice * (1 - item.discount / 100) * (1 + item.taxRate / 100)
              return (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-900">{item.description}</td>
                  <td className="py-3 text-gray-600">{item.qty}</td>
                  <td className="py-3 text-gray-600">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 text-gray-600">{item.discount}%</td>
                  <td className="py-3 text-gray-600">{item.taxRate}%</td>
                  <td className="py-3 font-medium text-gray-900 text-right">{formatCurrency(itemTotal)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="space-y-2 min-w-64 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Discount</span><span>- {formatCurrency(discountTotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax (GST)</span><span>+ {formatCurrency(taxTotal)}</span></div>
            <div className="border-t-2 border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>Grand Total</span><span>{formatCurrency(grandTotal)}</span>
            </div>
            {paidAmount > 0 && (
              <>
                <div className="flex justify-between text-green-600"><span>Paid</span><span>- {formatCurrency(paidAmount)}</span></div>
                <div className="flex justify-between font-bold text-red-600"><span>Balance Due</span><span>{formatCurrency(grandTotal - paidAmount)}</span></div>
              </>
            )}
          </div>
        </div>

        {invoice.notes && <p className="mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">{invoice.notes}</p>}
      </div>

      {/* Payments */}
      {invoice.payments.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Payment History</h2>
          <div className="space-y-3">
            {invoice.payments.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(p.amount)} via {p.method}</p>
                  <p className="text-xs text-gray-500">{formatDate(p.date)} · Ref: {p.reference || 'N/A'}</p>
                </div>
                <Badge variant="success">Received</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Record Payment">
        <div className="space-y-4">
          <Input label="Amount Received (₹)" type="number" value={payment.amount} onChange={e => setPayment(p => ({...p, amount: e.target.value}))} placeholder="0.00" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Payment Method" value={payment.method} onChange={e => setPayment(p => ({...p, method: e.target.value}))} options={[{ value: 'bank', label: 'Bank Transfer' }, { value: 'upi', label: 'UPI' }, { value: 'card', label: 'Card' }, { value: 'cash', label: 'Cash' }]} />
            <Input label="Date" type="date" value={payment.date} onChange={e => setPayment(p => ({...p, date: e.target.value}))} />
          </div>
          <Input label="Reference / UTR" value={payment.reference} onChange={e => setPayment(p => ({...p, reference: e.target.value}))} placeholder="TXN123456" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
            <Button onClick={handleRecordPayment}>Record Payment</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
