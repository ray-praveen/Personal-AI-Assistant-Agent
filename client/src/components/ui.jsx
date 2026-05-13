import { motion } from 'framer-motion';

export function PageHeader({ eyebrow, title, text, action }) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {action}
    </motion.div>
  );
}

export function Section({ eyebrow, title, text, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="section-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = '', delay = 0 }) {
  return (
    <motion.article
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.article>
  );
}

export function StatusBadge({ children, tone = 'cyan' }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}
