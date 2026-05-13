import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowRight,
  Check,
  Clock3,
  Download,
  FileUp,
  Loader2,
  Mic,
  Pause,
  PhoneCall,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Square,
  Trash2,
  X
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { api } from '../../services/api.js';
import { PageHeader, StatusBadge } from '../../components/ui.jsx';
import { activity, dashboardStats, integrations, timelineEvents } from '../../data/content.js';
import { UserName } from '../../components/auth.jsx';

const trendData = [
  { day: 'Mon', tasks: 16, cost: 42 },
  { day: 'Tue', tasks: 22, cost: 58 },
  { day: 'Wed', tasks: 19, cost: 51 },
  { day: 'Thu', tasks: 31, cost: 78 },
  { day: 'Fri', tasks: 27, cost: 63 },
  { day: 'Sat', tasks: 14, cost: 36 },
  { day: 'Sun', tasks: 18, cost: 44 }
];

const statusData = [
  { name: 'Completed', value: 64, color: '#00f5d4' },
  { name: 'Waiting', value: 18, color: '#f59e0b' },
  { name: 'Running', value: 12, color: '#06b6d4' },
  { name: 'Failed', value: 6, color: '#fb7185' }
];

function StatGrid() {
  return (
    <div className="stat-grid">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article className={`stat-card ${stat.tone}`} key={stat.label}>
            <Icon size={22} />
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.delta}</small>
          </article>
        );
      })}
    </div>
  );
}

export function DashboardOverview() {
  const { data } = useQuery({ queryKey: ['dashboard'], queryFn: api.getDashboard });

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Overview"
        title={<><UserName />, your command desk is live</>}
        text="A living view of what your assistant is doing, what needs judgment, and what already got handled."
        action={<button className="button"><Plus size={18} /> New Task</button>}
      />
      <StatGrid />
      <div className="dashboard-grid">
        <section className="panel large">
          <div className="panel-header">
            <h2>Task volume and spend</h2>
            <StatusBadge>Live</StatusBadge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data?.trend || trendData}>
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#00f5d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Area type="monotone" dataKey="tasks" stroke="#00f5d4" fill="url(#taskGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="panel">
          <div className="panel-header">
            <h2>Status mix</h2>
            <StatusBadge tone="green">91.8%</StatusBadge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie innerRadius={58} outerRadius={90} paddingAngle={4} data={statusData} dataKey="value">
                {statusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend-row">{statusData.map((item) => <span key={item.name}><i style={{ background: item.color }} /> {item.name}</span>)}</div>
        </section>
      </div>
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header"><h2>Recent activity</h2></div>
          <ul className="activity-list">{activity.map((item) => <li key={item}><Clock3 size={16} /> {item}</li>)}</ul>
        </section>
        <section className="panel">
          <div className="panel-header"><h2>Worker health</h2><StatusBadge tone="green">Nominal</StatusBadge></div>
          {['task-queue', 'automation-queue', 'voice-queue', 'notification-queue'].map((queue, index) => (
            <div className="queue-row" key={queue}><span>{queue}</span><div className="meter"><span style={{ width: `${42 + index * 11}%` }} /></div></div>
          ))}
        </section>
      </div>
    </div>
  );
}

export function TaskComposerPage() {
  const [prompt, setPrompt] = useState('Order my usual from Burma Superstar on DoorDash and deliver to home');
  const queryClient = useQueryClient();
  const createTask = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const estimate = useMemo(() => {
    const isCall = prompt.toLowerCase().includes('call') || prompt.toLowerCase().includes('reservation');
    return {
      type: isCall ? 'VOICE_CALL' : 'WEB_AUTOMATION',
      duration: isCall ? '4-9 min' : '2-6 min',
      cost: isCall ? '$0.75-2.20' : '$0.50-1.80'
    };
  }, [prompt]);

  return (
    <div className="app-page">
      <PageHeader eyebrow="Task Composer" title="Tell TaskPilot what to handle" text="Natural language in, approval-gated execution out." />
      <section className="composer-panel">
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <div className="composer-footer">
          <button className="button secondary"><FileUp size={18} /> Attachment</button>
          <div className="estimate-row">
            <StatusBadge>{estimate.type}</StatusBadge>
            <span>{estimate.duration}</span>
            <span>{estimate.cost}</span>
          </div>
          <button
            className="button"
            disabled={createTask.isPending}
            onClick={() => createTask.mutate({ prompt, source: 'dashboard' })}
          >
            {createTask.isPending ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
            Submit Task
          </button>
        </div>
      </section>
      <div className="prompt-grid">
        {[
          'Fill out Arya Redwood Day permission slip from the attached photo',
          'Call Chez Panisse for two people Friday at 7pm under Suri',
          'Initiate an Amazon return for the kitchen scale',
          'Renew my car registration on the DMV website'
        ].map((suggestion) => (
          <button key={suggestion} onClick={() => setPrompt(suggestion)}>{suggestion}</button>
        ))}
      </div>
      {createTask.data && <div className="toast-inline"><Check size={18} /> Task queued: {createTask.data.task.id}</div>}
    </div>
  );
}

export function LiveMonitorPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Live Monitor" title="Approval checkpoint in progress" text="Track the browser session, step log, cost meter, and control state in real time." />
      <div className="monitor-layout">
        <section className="browser-panel">
          <div className="visual-toolbar"><span /><span /><span /><strong>browser.taskpilot.local</strong></div>
          <div className="browser-preview">
            <div className="receipt-card">
              <h3>Cart Summary</h3>
              <p>2 dozen red roses, Saturday delivery</p>
              <strong>$128.40</strong>
              <StatusBadge tone="amber">Approval needed</StatusBadge>
            </div>
          </div>
        </section>
        <section className="panel monitor-side">
          <div className="panel-header"><h2>Execution timeline</h2></div>
          <div className="timeline">
            {timelineEvents.map((event) => <div className={`timeline-item ${event.status}`} key={event.title}><span /><div><h3>{event.title}</h3><p>{event.meta}</p></div></div>)}
          </div>
          <div className="control-row">
            <button className="icon-button" aria-label="Pause"><Pause size={18} /></button>
            <button className="icon-button" aria-label="Resume"><Play size={18} /></button>
            <button className="icon-button danger" aria-label="Cancel"><Square size={18} /></button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ApprovalCenterPage() {
  const { data: tasks = [] } = useQuery({ queryKey: ['tasks'], queryFn: api.getTasks });
  const queryClient = useQueryClient();
  const approve = useMutation({ mutationFn: api.approve, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });
  const reject = useMutation({ mutationFn: api.reject, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });
  const pending = tasks.filter((task) => task.status === 'WAITING_APPROVAL');

  return (
    <div className="app-page">
      <PageHeader eyebrow="Approval Center" title="Review high-impact actions before execution" text="Every purchase, submission, or uncertain action waits here." />
      <div className="approval-grid">
        {(pending.length ? pending : [{ id: 'demo-approval', prompt: 'Order roses from 1-800-Flowers', estimatedCost: 128.4, approvalId: 'approval-demo', status: 'WAITING_APPROVAL' }]).map((task) => (
          <article className="approval-card" key={task.id}>
            <div className="screenshot-preview"><ShieldCheck size={42} /></div>
            <div className="approval-body">
              <StatusBadge tone="amber">{task.status}</StatusBadge>
              <h2>{task.prompt}</h2>
              <p>TaskPilot is ready to proceed. Estimated spend: ${Number(task.estimatedCost || 128.4).toFixed(2)}.</p>
              <div className="approval-actions">
                <button className="button" onClick={() => approve.mutate(task.approvalId || 'approval-demo')}><Check size={18} /> Approve</button>
                <button className="button secondary" onClick={() => reject.mutate(task.approvalId || 'approval-demo')}><X size={18} /> Reject</button>
                <button className="button secondary"><SlidersHorizontal size={18} /> Edit</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function VoiceCallCenterPage() {
  const { data: calls = [] } = useQuery({ queryKey: ['calls'], queryFn: api.getCalls });
  return (
    <div className="app-page">
      <PageHeader eyebrow="Voice Call Center" title="Outbound calls, transcripts, and summaries" text="Monitor active calls and inspect outcomes from AI-assisted phone workflows." action={<button className="button"><PhoneCall size={18} /> New Call</button>} />
      <div className="call-grid">
        {(calls.length ? calls : [
          { id: 'call_demo', status: 'COMPLETED', objective: 'Book Chez Panisse for Friday 7pm', durationSeconds: 312, summary: 'Reservation unavailable at 7pm. Held 7:30pm as fallback.' }
        ]).map((call) => (
          <article className="call-card" key={call.id}>
            <Mic className="card-icon" />
            <StatusBadge tone={call.status === 'COMPLETED' ? 'green' : 'cyan'}>{call.status}</StatusBadge>
            <h2>{call.objective}</h2>
            <p>{call.summary}</p>
            <div className="waveform">{Array.from({ length: 26 }).map((_, index) => <span key={index} style={{ height: `${18 + (index % 7) * 8}px` }} />)}</div>
            <small>{Math.round(call.durationSeconds / 60)} min call</small>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TaskHistoryPage() {
  const { data: tasks = [] } = useQuery({ queryKey: ['tasks'], queryFn: api.getTasks });
  return (
    <div className="app-page">
      <PageHeader eyebrow="Task History" title="Searchable execution memory" text="Receipts, transcripts, screenshots, costs, and completion records." />
      <DataTable rows={tasks} />
    </div>
  );
}

function DataTable({ rows }) {
  const fallbackRows = [
    { id: 'task_1001', type: 'WEB_AUTOMATION', prompt: 'Return Amazon kitchen scale', status: 'COMPLETED', estimatedCost: 0.74 },
    { id: 'task_1002', type: 'VOICE_CALL', prompt: 'Schedule dental cleaning', status: 'COMPLETED', estimatedCost: 1.2 },
    { id: 'task_1003', type: 'FORM_FILL', prompt: 'Redwood Day permission slip', status: 'WAITING_APPROVAL', estimatedCost: 0.91 }
  ];
  const source = rows.length ? rows : fallbackRows;
  return (
    <section className="panel">
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Type</th><th>Prompt</th><th>Status</th><th>Cost</th><th /></tr></thead>
          <tbody>
            {source.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.prompt}</td>
                <td><StatusBadge tone={row.status === 'COMPLETED' ? 'green' : 'amber'}>{row.status}</StatusBadge></td>
                <td>${Number(row.estimatedCost || 0).toFixed(2)}</td>
                <td><button className="icon-button" aria-label="Download"><Download size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function CredentialVaultPage() {
  const vault = [
    ['Amazon', 'secret/taskpilot/amazon', 'Connected'],
    ['DoorDash', 'secret/taskpilot/doordash', 'Connected'],
    ['Google Calendar', 'oauth/google/calendar', 'Needs refresh'],
    ['AWS Secrets Manager', 'aws/secrets-manager', 'Configured']
  ];
  return (
    <div className="app-page">
      <PageHeader eyebrow="Credential Vault" title="Secret references without raw exposure" text="Production deployments should use 1Password Connect, AWS Secrets Manager, or equivalent." action={<button className="button"><Plus size={18} /> Add Secret</button>} />
      <div className="vault-grid">
        {vault.map(([name, ref, status]) => (
          <article className="vault-card" key={name}>
            <ShieldCheck size={24} />
            <h2>{name}</h2>
            <code>{ref}</code>
            <StatusBadge tone={status === 'Connected' || status === 'Configured' ? 'green' : 'amber'}>{status}</StatusBadge>
          </article>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Integrations" title="Provider adapters and platform connections" text="Swap local mocks for production providers when credentials and safety reviews are complete." />
      <div className="card-grid three app-card-grid">
        {integrations.map((item) => {
          const Icon = item.icon;
          return <article className="integration-card" key={item.name}><Icon size={26} /><h2>{item.name}</h2><StatusBadge>{item.status}</StatusBadge><button className="button secondary">Configure</button></article>;
        })}
      </div>
    </div>
  );
}

export function BillingUsagePage() {
  const { data } = useQuery({ queryKey: ['billing'], queryFn: api.getBilling });
  return (
    <div className="app-page">
      <PageHeader eyebrow="Billing & Usage" title="Subscription, metering, and cost visibility" text="Track usage quotas, provider spend, invoices, and plan limits." />
      <div className="billing-grid">
        <section className="panel">
          <h2>Executive plan</h2>
          <div className="price">$199<small>/month</small></div>
          <p>{data?.cycle || 'May 2026'} usage is currently within expected limits.</p>
          <button className="button">Manage billing</button>
        </section>
        <section className="panel">
          <h2>Usage breakdown</h2>
          {Object.entries(data?.usage || { webTasks: 74, voiceMinutes: 126, approvals: 42, storageGb: 6 }).map(([label, value]) => (
            <div className="queue-row" key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </section>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Settings" title="Workspace controls" text="Configure approvals, notifications, risk thresholds, task timeouts, and account access." />
      <section className="settings-grid">
        {[
          ['Always confirm purchases', true],
          ['Pause when confidence is below 85%', true],
          ['Send Slack updates every 30 seconds', true],
          ['Auto-delete call recordings after 30 days', true],
          ['Allow SMS triggers', false],
          ['Enable production provider adapters', false]
        ].map(([label, enabled]) => (
          <label className="toggle-row" key={label}>
            <span>{label}</span>
            <input type="checkbox" defaultChecked={enabled} />
          </label>
        ))}
      </section>
    </div>
  );
}

export function AdminPanelPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Admin" title="Operational command center" text="Manage users, subscriptions, task metrics, feature flags, and error queues." />
      <StatGrid />
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header"><h2>Feature flags</h2></div>
          {['voice-calls', 'captcha-solver', 'stripe-live', 'slack-actions'].map((flag, index) => (
            <div className="queue-row" key={flag}><span>{flag}</span><StatusBadge tone={index < 2 ? 'green' : 'amber'}>{index < 2 ? 'Enabled' : 'Review'}</StatusBadge></div>
          ))}
        </section>
        <section className="panel">
          <div className="panel-header"><h2>Error queue</h2><button className="icon-button" aria-label="Retry"><RotateCcw size={18} /></button></div>
          <ul className="activity-list">
            <li><Trash2 size={16} /> DoorDash selector changed</li>
            <li><Trash2 size={16} /> Voice provider webhook signature missing</li>
            <li><Trash2 size={16} /> Slack token refresh required</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
