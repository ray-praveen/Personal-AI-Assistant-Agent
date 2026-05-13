import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.jsx';
import { RequireAuth } from './components/auth.jsx';
import { PublicLayout } from './components/PublicLayout.jsx';
import {
  AdminPanelPage,
  ApprovalCenterPage,
  BillingUsagePage,
  CredentialVaultPage,
  DashboardOverview,
  IntegrationsPage,
  LiveMonitorPage,
  SettingsPage,
  TaskComposerPage,
  TaskHistoryPage,
  VoiceCallCenterPage
} from './pages/app/DashboardPages.jsx';
import { HomePage } from './pages/public/HomePage.jsx';
import {
  AuthPage,
  ContactPage,
  DocsPage,
  FeaturesPage,
  PricingPage,
  SecurityPage,
  UseCasesPage
} from './pages/public/MarketingPages.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="use-cases" element={<UseCasesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route path="app" element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route index element={<DashboardOverview />} />
        <Route path="tasks" element={<TaskComposerPage />} />
        <Route path="monitor" element={<LiveMonitorPage />} />
        <Route path="approvals" element={<ApprovalCenterPage />} />
        <Route path="calls" element={<VoiceCallCenterPage />} />
        <Route path="history" element={<TaskHistoryPage />} />
        <Route path="vault" element={<CredentialVaultPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="billing" element={<BillingUsagePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin" element={<AdminPanelPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
