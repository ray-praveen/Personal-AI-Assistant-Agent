import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Menu, ShieldCheck } from 'lucide-react';
import { navLinks } from '../data/content.js';
import { AuthCta } from './auth.jsx';

export function PublicLayout() {
  return (
    <div className="site-shell">
      <header className="top-nav">
        <Link to="/" className="brand">
          <span className="brand-mark"><Bot size={20} /></span>
          <span>TaskPilot AI</span>
        </Link>
        <nav className="desktop-nav">
          {navLinks.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Link to="/auth" className="ghost-link">Sign in</Link>
          <AuthCta />
          <button className="icon-button mobile-only" aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark"><Bot size={18} /></span>
            <span>TaskPilot AI</span>
          </Link>
          <p>Your AI Chief of Staff for the Real World.</p>
        </div>
        <div className="footer-grid">
          <span>Slack</span>
          <span>Playwright</span>
          <span>Voice AI</span>
          <span>Vaults</span>
        </div>
        <motion.div className="trust-chip" whileHover={{ y: -2 }}>
          <ShieldCheck size={18} /> Approval-gated by design
        </motion.div>
      </footer>
    </div>
  );
}
