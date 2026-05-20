'use client'

import {
  DollarSign,
  Briefcase,
  Users,
  FileText,
  UsersRound,
  Plus,
  ArrowRight,
  AlertCircle,
  CalendarClock,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { KPICard } from '@/components/shared/KPICard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 28000 },
  { month: 'Mar', revenue: 48000, expenses: 35000 },
  { month: 'Apr', revenue: 61000, expenses: 30000 },
  { month: 'May', revenue: 55000, expenses: 33000 },
  { month: 'Jun', revenue: 67000, expenses: 38000 },
]

const leadFunnelData = [
  { name: 'New', value: 24, color: '#3b82f6' },
  { name: 'Contacted', value: 18, color: '#06b6d4' },
  { name: 'Qualified', value: 12, color: '#8b5cf6' },
  { name: 'Proposal', value: 8, color: '#f59e0b' },
  { name: 'Won', value: 5, color: '#22c55e' },
]

const recentActivity = [
  { id: '1', text: 'Invoice #INV-042 paid by Acme Corp', time: new Date(Date.now() - 1800000), type: 'success' },
  { id: '2', text: 'New lead added: Priya Sharma from TechStart', time: new Date(Date.now() - 7200000), type: 'info' },
  { id: '3', text: 'Project "App Redesign" moved to Review', time: new Date(Date.now() - 14400000), type: 'default' },
  { id: '4', text: 'Expense of ₹15,000 approved for Marketing', time: new Date(Date.now() - 28800000), type: 'warning' },
  { id: '5', text: 'Team member Ravi completed 8 tasks today', time: new Date(Date.now() - 43200000), type: 'default' },
]

const upcomingDeadlines = [
  { id: '1', title: 'Mobile App v2.0 release', project: 'FinTrack App', dueDate: new Date(Date.now() + 172800000) },
  { id: '2', title: 'Client presentation', project: 'Acme Redesign', dueDate: new Date(Date.now() + 345600000) },
  { id: '3', title: 'Invoice #INV-045 due', project: 'Finance', dueDate: new Date(Date.now() + 518400000) },
]

const topClients = [
  { name: 'Acme Corp', revenue: 245000 },
  { name: 'TechStart Inc', revenue: 180000 },
  { name: 'Global Solutions', revenue: 156000 },
  { name: 'Innovate Labs', revenue: 120000 },
  { name: 'Digital Wave', revenue: 98000 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here&apos;s your startup overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/finance/invoices/new">
            <Button size="sm">
              <Plus className="h-4 w-4" /> New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Revenue (MTD)"
          value={formatCurrency(67000)}
          change={12.5}
          changeLabel="vs last month"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <KPICard
          title="Active Projects"
          value="8"
          change={2}
          changeLabel="new this week"
          icon={Briefcase}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <KPICard
          title="Open Leads"
          value="24"
          change={-5}
          changeLabel="vs last month"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <KPICard
          title="Unpaid Invoices"
          value={formatCurrency(145000)}
          icon={FileText}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <KPICard
          title="Team Size"
          value="12"
          change={1}
          changeLabel="new hire"
          icon={UsersRound}
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50"
        />
      </div>

      {/* Overdue Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">
            3 invoices are overdue totaling {formatCurrency(52000)}
          </p>
        </div>
        <Link href="/dashboard/finance/invoices?status=overdue">
          <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-100">
            View Overdue
          </Button>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Revenue vs Expenses</h2>
            <Badge variant="info">Last 6 months</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Lead Funnel</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={leadFunnelData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {leadFunnelData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {leadFunnelData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="mt-1">
                  <div className={`h-2 w-2 rounded-full ${
                    item.type === 'success' ? 'bg-green-500' :
                    item.type === 'info' ? 'bg-blue-500' :
                    item.type === 'warning' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatRelativeDate(item.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Upcoming Deadlines</h2>
            <CalendarClock className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.project}</p>
                </div>
                <Badge variant="warning">{formatRelativeDate(item.dueDate).replace(' ago', '')}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients by Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Top Clients</h2>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topClients.map((client, i) => (
              <div key={client.name} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(client.revenue / topClients[0].revenue) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{formatCurrency(client.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'New Invoice', href: '/dashboard/finance/invoices/new', icon: FileText },
            { label: 'Add Lead', href: '/dashboard/crm/leads', icon: Users },
            { label: 'New Project', href: '/dashboard/projects', icon: Briefcase },
            { label: 'Log Expense', href: '/dashboard/finance/expenses', icon: DollarSign },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors group"
            >
              <action.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-400 ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
