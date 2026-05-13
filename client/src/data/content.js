import {
  Activity,
  AudioLines,
  BadgeCheck,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  CreditCard,
  DatabaseZap,
  FileCheck2,
  Gauge,
  Globe2,
  History,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Network,
  PhoneCall,
  Plug,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  Users,
  WalletCards,
  Workflow,
  Zap
} from 'lucide-react';

export const navLinks = [
  { label: 'Features', path: '/features' },
  { label: 'Use Cases', path: '/use-cases' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Security', path: '/security' },
  { label: 'Docs', path: '/docs' },
  { label: 'Contact', path: '/contact' }
];

export const appNav = [
  { label: 'Overview', path: '/app', icon: LayoutDashboard },
  { label: 'New Task', path: '/app/tasks', icon: Sparkles },
  { label: 'Live Monitor', path: '/app/monitor', icon: Activity },
  { label: 'Approvals', path: '/app/approvals', icon: ClipboardCheck },
  { label: 'Calls', path: '/app/calls', icon: PhoneCall },
  { label: 'History', path: '/app/history', icon: History },
  { label: 'Vault', path: '/app/vault', icon: KeyRound },
  { label: 'Integrations', path: '/app/integrations', icon: Plug },
  { label: 'Billing', path: '/app/billing', icon: CreditCard },
  { label: 'Settings', path: '/app/settings', icon: Settings },
  { label: 'Admin', path: '/app/admin', icon: SlidersHorizontal }
];

export const featureCards = [
  {
    icon: MessageSquareText,
    title: 'Slack command center',
    text: 'Send natural language instructions through Slack with approval buttons, screenshots, and status updates.'
  },
  {
    icon: Globe2,
    title: 'Autonomous browser work',
    text: 'Playwright sessions navigate websites, fill forms, build carts, and pause at irreversible actions.'
  },
  {
    icon: AudioLines,
    title: 'Voice call agents',
    text: 'AI callers handle reservations, appointment scheduling, customer support, and simple inquiries.'
  },
  {
    icon: LockKeyhole,
    title: 'Secure personal context',
    text: 'Profiles, preferences, account references, and audit trails are designed around vault-backed storage.'
  },
  {
    icon: BadgeCheck,
    title: 'Human approval workflow',
    text: 'Purchases, submissions, and high-risk actions wait for explicit approval before execution.'
  },
  {
    icon: BarChart3,
    title: 'Operations analytics',
    text: 'Track task success, time saved, monthly spend, API usage, queue depth, and failure patterns.'
  }
];

export const useCases = [
  { icon: ReceiptText, title: 'Online orders', text: 'Amazon, flowers, DoorDash, subscriptions, returns, and receipts.' },
  { icon: FileCheck2, title: 'Forms', text: 'School forms, registrations, renewals, attachments, and review checkpoints.' },
  { icon: CalendarCheck, title: 'Appointments', text: 'Dental cleanings, service windows, restaurant bookings, and reminders.' },
  { icon: PhoneCall, title: 'Customer service', text: 'Call trees, hold time, summaries, transcripts, and escalation paths.' },
  { icon: WalletCards, title: 'Purchasing controls', text: 'Spend thresholds, saved payments, approvals, and audit evidence.' },
  { icon: Users, title: 'Team delegation', text: 'Enterprise admin controls for assistants, family offices, and operators.' }
];

export const pricingPlans = [
  {
    name: 'Free Trial',
    price: '$0',
    detail: 'Explore the workflow',
    features: ['10 task simulations', 'Dashboard access', 'Approval center', 'Email support'],
    cta: 'Start Trial'
  },
  {
    name: 'Pro',
    price: '$49',
    detail: 'per month',
    features: ['100 tasks', 'Slack bot', 'Web automation queue', 'Task history', 'Basic vault'],
    cta: 'Choose Pro',
    featured: true
  },
  {
    name: 'Executive',
    price: '$199',
    detail: 'per month',
    features: ['Unlimited tasks', 'Voice calls', 'Priority workers', 'Advanced analytics', 'Maintenance SLA'],
    cta: 'Go Executive'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    detail: 'annual contract',
    features: ['SSO and RBAC', 'Dedicated support', 'Private deployment', 'Custom integrations'],
    cta: 'Contact Sales'
  }
];

export const processSteps = [
  { title: 'Command', text: 'Submit through Slack or the dashboard.', icon: TerminalSquare },
  { title: 'Parse', text: 'Intent, target, parameters, risk, and cost are extracted.', icon: BrainCircuit },
  { title: 'Execute', text: 'A worker launches web automation or voice calling.', icon: Workflow },
  { title: 'Approve', text: 'Screenshots and summaries wait for explicit consent.', icon: CheckCircle2 },
  { title: 'Report', text: 'Receipts, transcripts, audit logs, and metrics are saved.', icon: DatabaseZap }
];

export const dashboardStats = [
  { label: 'Tasks Completed', value: '1,284', delta: '+18%', icon: CheckCircle2, tone: 'cyan' },
  { label: 'Pending Approvals', value: '7', delta: '2 urgent', icon: ClipboardCheck, tone: 'amber' },
  { label: 'Success Rate', value: '91.8%', delta: '+4.2%', icon: Gauge, tone: 'green' },
  { label: 'Time Saved', value: '146h', delta: 'this month', icon: Clock3, tone: 'violet' },
  { label: 'Monthly Spend', value: '$312', delta: '-9%', icon: WalletCards, tone: 'rose' },
  { label: 'API Usage', value: '63%', delta: 'healthy', icon: Zap, tone: 'blue' }
];

export const activity = [
  'Approval requested for DoorDash reorder',
  'Voice call completed with Redwood Dental',
  'Amazon return label generated',
  'Slack workspace reauthorized',
  'Credential vault rotation scheduled'
];

export const timelineEvents = [
  { status: 'complete', title: 'Intent parsed', meta: 'WEB_AUTOMATION, confidence 96%' },
  { status: 'complete', title: 'Browser session launched', meta: 'Persistent profile clone ready' },
  { status: 'active', title: 'Cart review checkpoint', meta: 'Waiting for approval before purchase' },
  { status: 'pending', title: 'Complete order', meta: 'Will resume after approval' }
];

export const integrations = [
  { name: 'Slack', status: 'Connected', icon: MessageSquareText },
  { name: 'Anthropic Claude', status: 'Configured', icon: Bot },
  { name: 'Playwright', status: 'Worker ready', icon: Boxes },
  { name: 'Vapi', status: 'Sandbox', icon: PhoneCall },
  { name: 'Stripe', status: 'Test mode', icon: CreditCard },
  { name: 'AWS Secrets Manager', status: 'Pending keys', icon: ShieldCheck }
];

export const docs = [
  { title: 'Getting started', text: 'Install Slack, add personal context, and run your first approval-gated task.' },
  { title: 'Automation model', text: 'How task parsing, browser sessions, screenshots, and worker retries fit together.' },
  { title: 'Voice calling', text: 'Configure Vapi or Retell, choose a voice, and inspect transcripts.' },
  { title: 'Security architecture', text: 'Credential vaulting, audit logs, encrypted assets, RBAC, and deployment boundaries.' }
];

export const securityItems = [
  { icon: ShieldCheck, title: 'Approval-first control', text: 'Purchases and irreversible submissions are blocked until the user confirms.' },
  { icon: LockKeyhole, title: 'Vault-backed secrets', text: 'Secrets are referenced by provider keys and never embedded in code.' },
  { icon: Network, title: 'Scoped integrations', text: 'Slack, voice, billing, and automation credentials can be rotated independently.' },
  { icon: Bell, title: 'Audit evidence', text: 'Every sensitive event receives a timestamped record and metadata trail.' },
  { icon: Search, title: 'Operational visibility', text: 'Admin views expose queue health, errors, costs, and task outcomes.' },
  { icon: ChevronRight, title: 'Production handoff', text: 'Adapters are isolated so real providers can replace local mocks deliberately.' }
];
