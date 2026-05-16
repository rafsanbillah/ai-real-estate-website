const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
}

export const api = {
  chat: (payload) => request('/api/chat', { method: 'POST', body: JSON.stringify(payload) }),
  createLead: (payload) => request('/api/leads', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  leads: (params = '') => request(`/api/leads${params}`),
  updateLead: (id, payload) => request(`/api/leads/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  exportUrl: () => `${API_BASE}/api/leads/export`
};
