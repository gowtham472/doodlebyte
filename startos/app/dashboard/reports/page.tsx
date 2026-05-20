'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Users, Package, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { KPICard } from '@/components/shared/KPICard'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const monthlyRevenue = [
  { month: 'Nov', revenue: 185000, expenses: 92000, profit: 93000 },
  { month: 'Dec', revenue: 220000, expenses: 105000, profit: 115000 },
  { month: 'Jan', revenue: 195000, expenses: 98000, profit: 97000 },
  { month: 'Feb', revenue: 240000, expenses: 115000, profit: 125000 },
  { month: 'Mar', revenue: 275000, expenses: 130000, profit: 145000 },
  { month: 'Apr', revenue: 310000, expenses: 142000, profit: 168000 },
  { month: 'May', revenue: 165000, expenses: 75000, profit: 90000 },
]

const expenseBreakdown = [
  { name: 'Salaries', value: 420000, color: '#3b82f6' },
  { name: 'Infrastructure', value: 85000, color: '#8b5cf6' },
  { name: 'Marketing', value: 62000, color: '#f59e0b' },
  { name: 'Software', value: 38000, color: '#10b981' },
  { name: 'Others', value: 42000, color: '#6b7280' },
]

const leadFunnelData = [
  { stage: 'New', count: 38 },
  { stage: 'Contacted', count: 29 },
  { stage: 'Qualified', count: 22 },
  { stage: 'Proposal', count: 15 },
  { stage: 'Negotiation', count: 9 },
  { stage: 'Won', count: 6 },
]

const projectStatusData = [
  { name: 'Completed', value: 8, color: '#10b981' },
  { name: 'In Progress', value: 5, color: '#3b82f6' },
  { name: 'Planning', value: 3, color: '#f59e0b' },
  { name: 'On Hold', value: 2, color: '#6b7280' },
]

const teamPerformance = [
  { name: 'Ravi Kumar', tasks: 28, hours: 168, utilization: 75 },
  { name: 'Priya Sharma', tasks: 22, hours: 144, utilization: 60 },
  { name: 'Amit Patel', tasks: 31, hours: 192, utilization: 90 },
  { name: 'Deepika Nair', tasks: 18, hours: 120, utilization: 40 },
  { name: 'Karan Mehta', tasks: 15, hours: 96, utilization: 55 },
]

const topClients = [
  { name: 'Acme Corp', revenue: 580000, projects: 3, invoicesPaid: 12 },
  { name: 'TechStart Inc', revenue: 420000, projects: 2, invoicesPaid: 8 },
  { name: 'Global Solutions', revenue: 310000, projects: 2, invoicesPaid: 6 },
  { name: 'Innovate Labs', revenue: 280000, projects: 1, invoicesPaid: 5 },
  { name: 'Digital Wave', revenue: 195000, projects: 2, invoicesPaid: 9 },
]

const TABS = ['Overview', 'Finance', 'Sales', 'Projects', 'Team']
const PERIODS = ['This Month', 'Last 3 Months', 'Last 6 Months', 'This Year']

const COLORS_PIE = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

export default function ReportsPage() {
  const [tab, setTab] = useState('Overview')
  const [period, setPeriod] = useState('Last 6 Months')

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalExpenses = monthlyRevenue.reduce((s, m) => s + m.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics and insights across your business</p>
        </div>
        <Button variant="outline" onClick={() => toast.info('Generating PDF report...')}><Download className="h-4 w-4" /> Export Report</Button>
      </div>

      {/* Period Filter */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <div className="flex gap-1">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${period === p ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-100 px-4 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Overview Tab */}
          {tab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <KPICard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-50" change={12} />
                <KPICard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={TrendingDown} iconColor="text-red-600" iconBg="bg-red-50" change={-5} />
                <KPICard title="Net Profit" value={formatCurrency(totalProfit)} icon={DollarSign} iconColor="text-blue-600" iconBg="bg-blue-50" change={18} />
                <KPICard title="Profit Margin" value={`${profitMargin}%`} icon={TrendingUp} iconColor="text-purple-600" iconBg="bg-purple-50" change={3} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Active Projects', value: '5', sub: '18 total all time', icon: Briefcase, color: 'text-blue-600' },
                  { label: 'Conversion Rate', value: '15.8%', sub: '6 won / 38 leads', icon: TrendingUp, color: 'text-green-600' },
                  { label: 'Team Utilization', value: '64%', sub: 'Avg across 8 members', icon: Users, color: 'text-amber-600' },
                ].map(stat => (
                  <div key={stat.label} className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
                    <div className={`p-3 bg-white rounded-xl shadow-sm ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={monthlyRevenue} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" name="Profit" fill="#34d399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Finance Tab */}
          {tab === 'Finance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Monthly P&L</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Expense Breakdown</h3>
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                          {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {expenseBreakdown.map(e => (
                        <div key={e.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                            <span className="text-gray-700">{e.name}</span>
                          </div>
                          <span className="font-medium text-gray-900">{formatCurrency(e.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Clients */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Top Clients by Revenue</h3>
                <div className="space-y-2">
                  {topClients.map((client, i) => {
                    const maxRevenue = topClients[0].revenue
                    return (
                      <div key={client.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm text-gray-900">{client.name}</p>
                            <p className="font-bold text-sm text-gray-900">{formatCurrency(client.revenue)}</p>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(client.revenue / maxRevenue) * 100}%` }} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{client.projects} projects · {client.invoicesPaid} invoices paid</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Sales Tab */}
          {tab === 'Sales' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Lead Funnel</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={leadFunnelData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="stage" tick={{ fontSize: 12 }} width={90} />
                      <Tooltip />
                      <Bar dataKey="count" name="Leads" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                        {leadFunnelData.map((_, i) => (
                          <Cell key={i} fill={`hsl(217, ${100 - i * 10}%, ${45 + i * 5}%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Sales Metrics</h3>
                  {[
                    { label: 'Total Leads', value: '38', change: '+12%' },
                    { label: 'Qualified Leads', value: '22', change: '+8%' },
                    { label: 'Deals Won', value: '6', change: '+20%' },
                    { label: 'Deals Lost', value: '4', change: '-5%' },
                    { label: 'Avg Deal Size', value: formatCurrency(285000), change: '+15%' },
                    { label: 'Sales Cycle', value: '28 days', change: '-3 days' },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{m.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">{m.value}</span>
                        <Badge variant={m.change.startsWith('+') || m.change.startsWith('-3') ? 'success' : 'danger'} className="text-xs">{m.change}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {tab === 'Projects' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Project Status Distribution</h3>
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie data={projectStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                          {projectStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-3">
                      {projectStatusData.map(p => (
                        <div key={p.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                            <span className="text-sm text-gray-700">{p.name}</span>
                          </div>
                          <span className="font-bold text-gray-900">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Project Metrics</h3>
                  {[
                    { label: 'On-time Delivery', value: '72%', color: 'text-green-600' },
                    { label: 'Budget Compliance', value: '85%', color: 'text-blue-600' },
                    { label: 'Client Satisfaction', value: '4.2/5', color: 'text-amber-600' },
                    { label: 'Avg Project Duration', value: '3.8 months', color: 'text-gray-700' },
                    { label: 'Total Budget Managed', value: formatCurrency(1285000), color: 'text-gray-700' },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{m.label}</span>
                      <span className={`font-bold text-sm ${m.color}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {tab === 'Team' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Team Performance</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={teamPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasks" name="Tasks Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hours" name="Hours Logged" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Utilization Rate</h3>
                <div className="space-y-3">
                  {teamPerformance.map(m => (
                    <div key={m.name} className="flex items-center gap-4">
                      <p className="text-sm text-gray-700 w-32 flex-shrink-0">{m.name}</p>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${m.utilization >= 80 ? 'bg-red-500' : m.utilization >= 60 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${m.utilization}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{m.utilization}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
