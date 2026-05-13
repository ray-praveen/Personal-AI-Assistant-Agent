import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Send } from 'lucide-react';
import { Card, PageHeader, Section } from '../../components/ui.jsx';
import { docs, featureCards, pricingPlans, securityItems, useCases } from '../../data/content.js';
import { ClerkSignInPanel } from '../../components/auth.jsx';
import { hasClerk } from '../../providers/AuthProvider.jsx';

export function FeaturesPage() {
  return (
    <main className="content-page">
      <PageHeader eyebrow="Features" title="A complete operations layer for AI-assisted execution" text="From Slack intake to browser workers, voice agents, approvals, vaults, billing, and observability." />
      <div className="card-grid three">
        {featureCards.map((item) => {
          const Icon = item.icon;
          return <Card key={item.title}><Icon className="card-icon" /><h3>{item.title}</h3><p>{item.text}</p></Card>;
        })}
      </div>
      <Section title="Platform modules">
        <div className="module-table">
          {['Auth', 'Task orchestration', 'AI intent parsing', 'Automation workers', 'Voice calls', 'Approvals', 'Secrets', 'Billing', 'Audit', 'Admin'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </Section>
    </main>
  );
}

export function UseCasesPage() {
  return (
    <main className="content-page">
      <PageHeader eyebrow="Use Cases" title="Real-world task automation for busy teams and families" text="TaskPilot is designed for repetitive work that crosses websites, phones, forms, and follow-up." />
      <div className="card-grid three">
        {useCases.map((item) => {
          const Icon = item.icon;
          return <Card key={item.title}><Icon className="card-icon alt" /><h3>{item.title}</h3><p>{item.text}</p></Card>;
        })}
      </div>
    </main>
  );
}

export function PricingPage() {
  return (
    <main className="content-page">
      <PageHeader eyebrow="Pricing" title="Start with a trial, scale into an executive workflow" text="Each plan is built around clear usage, approval checkpoints, and a path toward production-grade automation." />
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? 'pricing-card featured' : 'pricing-card'}>
            <h3>{plan.name}</h3>
            <div className="price">{plan.price}<small>{plan.detail}</small></div>
            <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} /> {feature}</li>)}</ul>
            <Link className={plan.featured ? 'button' : 'button secondary'} to="/auth">{plan.cta}</Link>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function SecurityPage() {
  return (
    <main className="content-page">
      <PageHeader eyebrow="Security" title="Approval-first architecture for sensitive delegation" text="The system handles payments, identity, forms, and phone calls with explicit checkpoints and traceable boundaries." />
      <div className="card-grid three">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return <Card key={item.title}><Icon className="card-icon" /><h3>{item.title}</h3><p>{item.text}</p></Card>;
        })}
      </div>
    </main>
  );
}

export function DocsPage() {
  return (
    <main className="content-page docs-layout">
      <PageHeader eyebrow="Docs" title="Developer-friendly implementation guide" text="Architecture, modules, provider adapters, and deployment shape for the TaskPilot AI platform." />
      <div className="docs-grid">
        <aside className="docs-sidebar">
          {docs.map((doc) => <a href={`#${doc.title.replaceAll(' ', '-')}`} key={doc.title}>{doc.title}</a>)}
        </aside>
        <div className="docs-content">
          {docs.map((doc) => (
            <Card key={doc.title} className="doc-card">
              <h3 id={doc.title.replaceAll(' ', '-')}>{doc.title}</h3>
              <p>{doc.text}</p>
              <pre>{`GET /api/tasks\nPOST /api/approvals/:id/approve\nPOST /api/slack/actions`}</pre>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="content-page">
      <PageHeader eyebrow="Contact" title="Talk to TaskPilot AI" text="Plan a rollout, production integration, or executive assistant workflow." />
      <div className="contact-grid">
        <Card>
          <Mail className="card-icon" />
          <h3>Sales and demos</h3>
          <p>Get a walkthrough of Slack commands, approvals, dashboard controls, and the backend orchestration model.</p>
        </Card>
        <form className="contact-form">
          <input placeholder="Name" />
          <input placeholder="Work email" />
          <select defaultValue="Executive">
            <option>Pro</option>
            <option>Executive</option>
            <option>Enterprise</option>
          </select>
          <textarea placeholder="What do you want TaskPilot AI to automate?" />
          <button type="button" className="button"><Send size={18} /> Send Request</button>
        </form>
      </div>
    </main>
  );
}

export function AuthPage() {
  const clerkEnabled = hasClerk();

  return (
    <main className="auth-page">
      <ClerkSignInPanel />
      {!clerkEnabled && (
        <form className="auth-panel">
          <span className="eyebrow">Demo workspace</span>
          <h1>Preview TaskPilot AI</h1>
          <p>Clerk is ready to enable. Add your publishable and secret keys to switch this screen into real authentication.</p>
          <input placeholder="Email address" />
          <input placeholder="Password" type="password" />
          <Link to="/app" className="button">Continue in Demo <ArrowRight size={18} /></Link>
        </form>
      )}
    </main>
  );
}
