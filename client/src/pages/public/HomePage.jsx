import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Check, Play, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { Card, Section } from '../../components/ui.jsx';
import { featureCards, pricingPlans, processSteps, useCases } from '../../data/content.js';

function ControlCenterVisual() {
  const [active, setActive] = useState(1);
  const tasks = ['DoorDash reorder', 'DMV renewal', 'Dental call'];

  return (
    <motion.div className="control-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="visual-toolbar">
        <span />
        <span />
        <span />
        <strong>Live Task Console</strong>
      </div>
      <div className="visual-grid">
        <div className="visual-terminal">
          <div className="task-tabs">
            {tasks.map((task, index) => (
              <button className={active === index ? 'active' : ''} key={task} onClick={() => setActive(index)}>{task}</button>
            ))}
          </div>
          <p>/do {active === 0 ? 'Order my usual and deliver to home' : active === 1 ? 'Renew car registration on DMV site' : 'Schedule a dental cleaning next week'}</p>
          <p className="cyan">Intent: {active === 2 ? 'VOICE_CALL' : 'WEB_AUTOMATION'}</p>
          <p className="green">Checkpoint: human approval required</p>
        </div>
        <div className="visual-flow">
          {['Slack', 'Parse', 'Browse', 'Approve', 'Done'].map((step, index) => (
            <motion.span
              key={step}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 2.6, delay: index * 0.22 }}
            >
              {step}
            </motion.span>
          ))}
        </div>
        <div className="visual-browser">
          <div className="browser-shot" />
          <div>
            <b>1-800-Flowers cart</b>
            <small>2 dozen red roses • Saturday delivery • $128.40</small>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const hazeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-haze" style={{ opacity: hazeOpacity }} aria-hidden="true" />
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, index) => <span key={index} />)}
        </div>
        <motion.div className="hero-copy" style={{ y: copyY }}>
          <span className="eyebrow"><Sparkles size={16} /> Real-world AI operations</span>
          <h1>TaskPilot AI</h1>
          <p className="hero-tagline">Your AI Chief of Staff for the Real World.</p>
          <p>
            A calm command center for errands that normally steal your afternoon: orders, forms, calls, returns, appointments, approvals, and the evidence trail afterward.
          </p>
          <div className="hero-actions">
            <Link to="/app" className="button">Open Dashboard <ArrowRight size={18} /></Link>
            <Link to="/features" className="button secondary"><Play size={18} /> View Platform</Link>
          </div>
          <div className="proof-row">
            {['Approval gated', 'Vault ready', 'Slack native'].map((item) => (
              <span key={item}><Check size={16} /> {item}</span>
            ))}
          </div>
        </motion.div>
        <motion.div style={{ y: visualY }}>
          <ControlCenterVisual />
        </motion.div>
      </section>

      <div className="logo-strip">
        {['Linear', 'Vercel', 'OpenAI', 'Raycast', 'Stripe', 'Superhuman'].map((logo) => <span key={logo}>{logo}</span>)}
      </div>

      <Section eyebrow="Product Demo" title="A control center for delegated execution" text="The interface keeps every automation observable, reversible until approval, and traceable after completion.">
        <div className="demo-band">
          <div className="demo-command">/call Schedule a dental cleaning any morning next week</div>
          <div className="demo-stack">
            <span>Phone lookup</span>
            <span>Voice call</span>
            <span>Transcript</span>
            <span>Calendar-ready summary</span>
          </div>
        </div>
      </Section>

      <Section eyebrow="Live Operating Layer" title="The assistant feels present, not mysterious">
        <div className="ops-wall">
          {[
            ['08:42', 'Parsed DoorDash reorder', 'The agent found the saved restaurant and is checking delivery fees.'],
            ['08:43', 'Paused at checkout', 'Total changed by $3.18, so approval is required.'],
            ['08:45', 'Called Redwood Dental', 'The office offered Tuesday 10:30am or Thursday 9:00am.'],
            ['08:47', 'Audit saved', 'Screenshot, transcript summary, and cost metadata were attached.']
          ].map(([time, title, text], index) => (
            <motion.article
              className="ops-event"
              key={title}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <span>{time}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <Waves size={18} />
            </motion.article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core System" title="Everything needed for a personal AI operator">
        <div className="card-grid three">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} delay={index * 0.04}>
                <Icon className="card-icon" size={24} />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Workflow" title="Command, observe, approve, complete">
        <div className="process-line">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="process-card" delay={index * 0.05}>
                <span className="step-count">0{index + 1}</span>
                <Icon size={22} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Use Cases" title="Built for messy real-world errands">
        <div className="card-grid three">
          {useCases.slice(0, 6).map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <Icon className="card-icon alt" size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Security" title="The assistant pauses where judgment matters">
        <div className="security-band">
          <ShieldCheck size={48} />
          <div>
            <h3>Human confirmation before every purchase or irreversible submission.</h3>
            <p>TaskPilot AI is designed around scoped credentials, private Slack channels, encrypted storage boundaries, audit logs, and provider adapters that can be reviewed before production activation.</p>
          </div>
          <Link className="button secondary" to="/security">Security Details</Link>
        </div>
      </Section>

      <Section eyebrow="Pricing" title="Plans that scale from personal trial to executive operations">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? 'pricing-card featured' : 'pricing-card'}>
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}<small>{plan.detail}</small></div>
              <ul>
                {plan.features.map((feature) => <li key={feature}><Check size={16} /> {feature}</li>)}
              </ul>
              <Link className={plan.featured ? 'button' : 'button secondary'} to="/auth">{plan.cta}</Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Designed for ambitious automation, shipped safely">
        <div className="faq-grid">
          {[
            ['Can it buy things automatically?', 'Not in v1. Every purchase waits for approval.'],
            ['Can it call businesses?', 'Yes, through a voice provider adapter such as Vapi or Retell.'],
            ['Where are credentials stored?', 'The production design uses external secret managers and encrypted browser profiles.'],
            ['Is this production-ready?', 'The app is structured for production, with provider adapters ready to replace local mocks.']
          ].map(([q, a]) => (
            <Card key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="final-cta">
        <h2>Delegate the next task without losing control.</h2>
        <Link to="/app" className="button">Launch TaskPilot <ArrowRight size={18} /></Link>
      </section>
    </>
  );
}
