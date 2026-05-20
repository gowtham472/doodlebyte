export type UserRole = 'admin' | 'manager' | 'developer' | 'designer' | 'sales' | 'finance' | 'viewer'

export interface User {
  uid: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  companyId: string
  createdAt: Date
}

export interface Company {
  id: string
  name: string
  logo?: string
  address?: string
  taxId?: string
  currency: string
  timezone: string
  invoicePrefix: string
  settings: {
    paymentTerms: string
    taxRate: number
    brandColor: string
  }
}

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
export type ClientType = 'lead' | 'active' | 'inactive'
export type LeadSource = 'referral' | 'website' | 'cold' | 'social' | 'event'

export interface Client {
  id: string
  companyId: string
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  type: ClientType
  leadStage?: LeadStage
  source?: LeadSource
  assignedTo?: string
  leadScore?: number
  tags: string[]
  notes?: string
  referredBy?: string
  ltv: number
  returnCount: number
  createdAt: Date
  updatedAt: Date
  convertedAt?: Date
}

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'partialpaid' | 'paid' | 'overdue' | 'cancelled'

export interface InvoiceLineItem {
  id: string
  description: string
  qty: number
  unitPrice: number
  discount: number
  taxRate: number
  total: number
}

export interface PaymentRecord {
  amount: number
  date: Date
  method: string
  reference?: string
}

export interface Invoice {
  id: string
  companyId: string
  clientId: string
  projectId?: string
  invoiceNumber: string
  status: InvoiceStatus
  issueDate: Date
  dueDate: Date
  paymentTerms: string
  lineItems: InvoiceLineItem[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  grandTotal: number
  currency: string
  notes?: string
  termsConditions?: string
  payments: PaymentRecord[]
}

export type ProjectStatus = 'planning' | 'inprogress' | 'review' | 'onhold' | 'completed' | 'cancelled'

export interface Project {
  id: string
  companyId: string
  clientId?: string
  name: string
  type: 'service' | 'product'
  status: ProjectStatus
  startDate: Date
  deadline: Date
  budget: number
  actualCost: number
  assignedTeam: string[]
  billingType: 'fixed' | 'hourly'
  tags: string[]
  description?: string
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  id: string
  projectId: string
  milestoneId?: string
  title: string
  description?: string
  assignedTo?: string
  status: TaskStatus
  priority: Priority
  dueDate?: Date
  estimatedHours?: number
  loggedHours: number
  subtasks: Subtask[]
  attachments: string[]
}

export interface Milestone {
  id: string
  projectId: string
  title: string
  dueDate: Date
  status: 'pending' | 'completed'
  order: number
}

export interface TimeEntry {
  id: string
  projectId: string
  userId: string
  taskId?: string
  hours: number
  date: Date
  billable: boolean
  notes?: string
}

export type ExpenseCategory = 'software' | 'infrastructure' | 'salary' | 'marketing' | 'legal' | 'office' | 'travel' | 'miscellaneous'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface Expense {
  id: string
  companyId: string
  title: string
  category: ExpenseCategory
  amount: number
  currency: string
  date: Date
  paidBy: string
  vendor?: string
  receiptUrl?: string
  linkedProject?: string
  recurring: boolean
  notes?: string
  approvalStatus: ApprovalStatus
  approvedBy?: string
}

export interface Income {
  id: string
  companyId: string
  clientId?: string
  invoiceId?: string
  amount: number
  currency: string
  date: Date
  paymentMethod: string
  reference?: string
  category: string
  notes?: string
}

export type ProductType = 'webapp' | 'mobileapp' | 'game' | 'website' | 'saas' | 'other'

export interface Product {
  id: string
  companyId: string
  name: string
  type: ProductType
  description?: string
  techStack: string[]
  platform: string[]
  status: string
  liveUrl?: string
  storeLinks?: Record<string, string>
  logoUrl?: string
  screenshots: string[]
  assignedTeam: string[]
  launchDate?: Date
}

export type VersionType = 'major' | 'minor' | 'patch' | 'hotfix'

export interface ProductVersion {
  id: string
  productId: string
  version: string
  releaseDate: Date
  type: VersionType
  changelog: {
    added: string[]
    fixed: string[]
    removed: string[]
  }
  status: 'upcoming' | 'released' | 'rolledback'
  linkedMilestoneId?: string
}

export type FeedbackType = 'bug' | 'feature' | 'general'
export type FeedbackSeverity = 'low' | 'medium' | 'high' | 'critical'
export type FeedbackStatus = 'new' | 'acknowledged' | 'inprogress' | 'resolved' | 'declined'

export interface ProductFeedback {
  id: string
  productId: string
  type: FeedbackType
  title: string
  description: string
  submittedBy: string
  severity?: FeedbackSeverity
  status: FeedbackStatus
  screenshots: string[]
  deviceInfo?: string
  upvotes: number
}

export interface ProjectFeedback {
  id: string
  companyId: string
  clientId: string
  projectId: string
  overallRating: number
  qualityRating: number
  communicationRating: number
  timelineRating: number
  npsScore: number
  writtenFeedback?: string
  wouldRecommend: boolean
  testimonialPermission: boolean
  createdAt: Date
}

export type EmploymentType = 'fulltime' | 'parttime' | 'freelancer' | 'intern'
export type PaymentType = 'monthly' | 'hourly' | 'project'

export interface TeamMember {
  id: string
  companyId: string
  userId: string
  name: string
  email: string
  role: UserRole
  department: string
  employmentType: EmploymentType
  joinDate: Date
  skills: string[]
  avatar?: string
  salary?: number
  paymentType: PaymentType
}

export interface Notification {
  id: string
  companyId: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: Date
}

export interface Referral {
  id: string
  companyId: string
  referrerId: string
  referredId: string
  date: Date
  status: string
  rewardType?: string
  rewardValue?: number
  rewardPaid: boolean
}
