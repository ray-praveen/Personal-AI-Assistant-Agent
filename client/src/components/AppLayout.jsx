import { NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Bot, Command, Menu, Search } from 'lucide-react';
import { appNav } from '../data/content.js';
import { useUiStore } from '../store/uiStore.js';
import { AuthWidget } from './auth.jsx';

export function AppLayout() {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <div className="app-shell">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 272, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <div className="sidebar-brand">
              <span className="brand-mark"><Bot size={20} /></span>
              <span>TaskPilot AI</span>
            </div>
            <nav className="app-nav">
              {appNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.path} to={item.path} end={item.path === '/app'}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="sidebar-meter">
              <span>Monthly task usage</span>
              <strong>63%</strong>
              <div className="meter"><span style={{ width: '63%' }} /></div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <section className="app-main">
        <header className="command-bar">
          <button className="icon-button" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu size={20} />
          </button>
          <div className="global-search">
            <Search size={18} />
            <input placeholder="Search tasks, calls, approvals, receipts..." />
            <kbd><Command size={13} /> K</kbd>
          </div>
          <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
          <AuthWidget />
        </header>
        <Outlet />
      </section>
    </div>
  );
}
