const API_BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload.data ?? payload;
}

export const api = {
  getHealth: () => request('/health'),
  getDashboard: () => request('/api/admin/overview'),
  getTasks: () => request('/api/tasks'),
  createTask: (body) =>
    request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(body)
    }),
  approve: (approvalId) =>
    request(`/api/approvals/${approvalId}/approve`, {
      method: 'POST'
    }),
  reject: (approvalId) =>
    request(`/api/approvals/${approvalId}/reject`, {
      method: 'POST'
    }),
  getCalls: () => request('/api/calls'),
  getBilling: () => request('/api/billing/usage'),
  getAudit: () => request('/api/audit')
};
