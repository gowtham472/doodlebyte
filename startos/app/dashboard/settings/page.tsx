'use client'

import { useState } from 'react'
import { Building2, User, Bell, Shield, Palette, CreditCard, Globe, Mail, Phone, MapPin, Save, Camera, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'

const TABS = [
  { key: 'company', label: 'Company', icon: Building2 },
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'billing', label: 'Billing', icon: CreditCard },
]

interface ToggleProps {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [tab, setTab] = useState('company')
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Company settings
  const [company, setCompany] = useState({
    name: 'DoodleByte Technologies',
    email: 'hello@doodlebyte.in',
    phone: '+91 98765 00000',
    website: 'https://doodlebyte.in',
    address: '123 Tech Park, Bangalore, Karnataka 560001',
    gstin: '29AABCD1234E1Z5',
    pan: 'AABCD1234E',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    fiscalYear: 'april',
  })

  // Profile settings
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@doodlebyte.in',
    phone: '+91 98765 43210',
    role: 'Founder & CEO',
    bio: 'Building the future of startup management.',
  })

  // Notification settings
  const [notifs, setNotifs] = useState({
    emailInvoicePaid: true,
    emailNewLead: true,
    emailProjectUpdate: false,
    emailWeeklyReport: true,
    pushInvoiceDue: true,
    pushNewMessage: true,
    pushTaskDue: true,
    pushProjectComplete: false,
    smsInvoicePaid: false,
    smsNewLead: false,
  })

  // Password change
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Settings saved successfully')
  }

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) { toast.error('All password fields are required'); return }
    if (passwords.newPass !== passwords.confirm) { toast.error('New passwords do not match'); return }
    if (passwords.newPass.length < 8) { toast.error('Password must be at least 8 characters'); return }
    toast.success('Password updated successfully')
    setPasswords({ current: '', newPass: '', confirm: '' })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="sm:w-52 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors ${tab === t.key ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-2 border-transparent'}`}>
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-6">

          {/* Company Tab */}
          {tab === 'company' && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Company Information</h2>
                <p className="text-sm text-gray-500">This information appears on your invoices and reports.</p>
              </div>
              <div className="space-y-4">
                <Input label="Company Name" value={company.name} onChange={e => setCompany(p => ({...p, name: e.target.value}))} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Business Email" type="email" value={company.email} onChange={e => setCompany(p => ({...p, email: e.target.value}))} />
                  <Input label="Phone" value={company.phone} onChange={e => setCompany(p => ({...p, phone: e.target.value}))} />
                </div>
                <Input label="Website" value={company.website} onChange={e => setCompany(p => ({...p, website: e.target.value}))} />
                <Input label="Address" value={company.address} onChange={e => setCompany(p => ({...p, address: e.target.value}))} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="GSTIN" value={company.gstin} onChange={e => setCompany(p => ({...p, gstin: e.target.value}))} />
                  <Input label="PAN" value={company.pan} onChange={e => setCompany(p => ({...p, pan: e.target.value}))} />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Regional Settings</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Select label="Currency" value={company.currency} onChange={e => setCompany(p => ({...p, currency: e.target.value}))}
                      options={[{ value: 'INR', label: '₹ Indian Rupee' }, { value: 'USD', label: '$ US Dollar' }, { value: 'EUR', label: '€ Euro' }, { value: 'GBP', label: '£ British Pound' }]} />
                    <Select label="Timezone" value={company.timezone} onChange={e => setCompany(p => ({...p, timezone: e.target.value}))}
                      options={[{ value: 'Asia/Kolkata', label: 'IST (UTC+5:30)' }, { value: 'UTC', label: 'UTC' }, { value: 'America/New_York', label: 'EST (UTC-5)' }]} />
                    <Select label="Fiscal Year Start" value={company.fiscalYear} onChange={e => setCompany(p => ({...p, fiscalYear: e.target.value}))}
                      options={[{ value: 'april', label: 'April (India)' }, { value: 'january', label: 'January' }, { value: 'july', label: 'July' }]} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} loading={saving}><Save className="h-4 w-4" /> Save Changes</Button>
              </div>
            </>
          )}

          {/* Profile Tab */}
          {tab === 'profile' && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Your Profile</h2>
                <p className="text-sm text-gray-500">Update your personal information and preferences.</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="relative">
                  <Avatar name={profile.name} size="xl" />
                  <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                  <Badge variant="success" className="mt-1 text-xs">Active</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
                  <Input label="Job Title / Role" value={profile.role} onChange={e => setProfile(p => ({...p, role: e.target.value}))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Email" type="email" value={profile.email} onChange={e => setProfile(p => ({...p, email: e.target.value}))} />
                  <Input label="Phone" value={profile.phone} onChange={e => setProfile(p => ({...p, phone: e.target.value}))} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea value={profile.bio} onChange={e => setProfile(p => ({...p, bio: e.target.value}))} rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} loading={saving}><Save className="h-4 w-4" /> Save Profile</Button>
              </div>
            </>
          )}

          {/* Notifications Tab */}
          {tab === 'notifications' && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Choose how and when you get notified.</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 divide-y divide-gray-100">
                  <Toggle checked={notifs.emailInvoicePaid} onChange={() => setNotifs(p => ({...p, emailInvoicePaid: !p.emailInvoicePaid}))} label="Invoice Paid" description="When a client marks an invoice as paid" />
                  <Toggle checked={notifs.emailNewLead} onChange={() => setNotifs(p => ({...p, emailNewLead: !p.emailNewLead}))} label="New Lead" description="When a new lead is added to the pipeline" />
                  <Toggle checked={notifs.emailProjectUpdate} onChange={() => setNotifs(p => ({...p, emailProjectUpdate: !p.emailProjectUpdate}))} label="Project Updates" description="Task completions and milestone achievements" />
                  <Toggle checked={notifs.emailWeeklyReport} onChange={() => setNotifs(p => ({...p, emailWeeklyReport: !p.emailWeeklyReport}))} label="Weekly Report" description="Summary every Monday morning" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Push Notifications</h3>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 divide-y divide-gray-100">
                  <Toggle checked={notifs.pushInvoiceDue} onChange={() => setNotifs(p => ({...p, pushInvoiceDue: !p.pushInvoiceDue}))} label="Invoice Due Reminder" description="3 days before invoice due date" />
                  <Toggle checked={notifs.pushNewMessage} onChange={() => setNotifs(p => ({...p, pushNewMessage: !p.pushNewMessage}))} label="New Messages" description="Direct messages from team members" />
                  <Toggle checked={notifs.pushTaskDue} onChange={() => setNotifs(p => ({...p, pushTaskDue: !p.pushTaskDue}))} label="Task Due Today" description="Morning reminder for tasks due today" />
                  <Toggle checked={notifs.pushProjectComplete} onChange={() => setNotifs(p => ({...p, pushProjectComplete: !p.pushProjectComplete}))} label="Project Completed" description="When a project reaches 100% completion" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} loading={saving}><Save className="h-4 w-4" /> Save Preferences</Button>
              </div>
            </>
          )}

          {/* Security Tab */}
          {tab === 'security' && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Security Settings</h2>
                <p className="text-sm text-gray-500">Manage your account security and login preferences.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Change Password</h3>
                <Input label="Current Password" type={showPassword ? 'text' : 'password'} value={passwords.current} onChange={e => setPasswords(p => ({...p, current: e.target.value}))} placeholder="Enter current password" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="New Password" type={showPassword ? 'text' : 'password'} value={passwords.newPass} onChange={e => setPasswords(p => ({...p, newPass: e.target.value}))} placeholder="Min 8 characters" />
                  <Input label="Confirm New Password" type={showPassword ? 'text' : 'password'} value={passwords.confirm} onChange={e => setPasswords(p => ({...p, confirm: e.target.value}))} placeholder="Repeat new password" />
                </div>
                <button onClick={() => setShowPassword(p => !p)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {showPassword ? 'Hide passwords' : 'Show passwords'}
                </button>
                <Button onClick={handlePasswordChange}>Update Password</Button>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Authenticator App</p>
                    <p className="text-xs text-gray-500">Use Google Authenticator or similar apps</p>
                  </div>
                  <Badge variant="default" className="text-xs">Not Enabled</Badge>
                </div>
                <Button variant="outline" onClick={() => toast.info('2FA setup coming soon')}>Enable 2FA</Button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Sessions</h3>
                {[
                  { device: 'Chrome on Windows', location: 'Bangalore, IN', time: 'Now (Current)', current: true },
                  { device: 'Mobile Safari', location: 'Mumbai, IN', time: '2 days ago', current: false },
                ].map(session => (
                  <div key={session.device} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{session.device}</p>
                      <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                    </div>
                    {session.current ? <Badge variant="success" className="text-xs">Current</Badge> : (
                      <Button size="sm" variant="ghost" onClick={() => toast.success('Session revoked')} className="text-xs text-red-600 hover:bg-red-50">Revoke</Button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Billing Tab */}
          {tab === 'billing' && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Billing & Subscription</h2>
                <p className="text-sm text-gray-500">Manage your plan and payment methods.</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium opacity-90">Current Plan</p>
                    <p className="text-2xl font-bold">StartOS Beta</p>
                  </div>
                  <Badge variant="info" className="bg-white/20 text-white border-white/30 text-sm font-semibold">FREE</Badge>
                </div>
                <p className="text-sm opacity-80">Beta access — all features included. Pricing starts when we launch v1.0.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Usage This Month</h3>
                {[
                  { label: 'Team Members', used: 8, limit: 'Unlimited' },
                  { label: 'Projects', used: 5, limit: 'Unlimited' },
                  { label: 'Invoices', used: 12, limit: 'Unlimited' },
                  { label: 'Storage', used: '2.3 GB', limit: '10 GB' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.used} / {item.limit}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">What's Coming in v1.0</h3>
                <div className="space-y-2">
                  {[
                    { plan: 'Starter', price: '₹999/mo', features: '3 users, 10 projects, 50 invoices' },
                    { plan: 'Growth', price: '₹2,499/mo', features: '10 users, unlimited projects, all features' },
                    { plan: 'Enterprise', price: 'Custom', features: 'Unlimited users, white label, dedicated support' },
                  ].map(plan => (
                    <div key={plan.plan} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{plan.plan}</p>
                        <p className="text-xs text-gray-500">{plan.features}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{plan.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
