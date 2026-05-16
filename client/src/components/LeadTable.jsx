import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { api } from '../utils/api.js';

const statuses = ['New', 'Contacted', 'Qualified', 'Closed'];

export default function LeadTable() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', sourceType: '' });
  const [error, setError] = useState('');
  const query = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v))).toString();
  const load = async () => { try { setLeads(await api.leads(query ? `?${query}` : '')); setError(''); } catch (err) { setError(err.message); } };
  useEffect(() => { load(); }, [filters.status, filters.sourceType]);
  const update = async (id, patch) => { await api.updateLead(id, patch); await load(); };
  const exportCsv = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(api.exportUrl(), { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-semibold"><Icon name="Filter" />Lead filters</div>
        <div className="flex flex-wrap gap-2">
          <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })} className="rounded-md border border-zinc-300 px-3 py-2 text-sm"><option value="">All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select>
          <select value={filters.sourceType} onChange={e => setFilters({ ...filters, sourceType: e.target.value })} className="rounded-md border border-zinc-300 px-3 py-2 text-sm"><option value="">All sources</option><option>chatbot</option><option>contact-form</option></select>
          <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white"><Icon name="Download" />CSV</button>
        </div>
      </div>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600"><tr><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Type</th><th className="p-3">Source</th><th className="p-3">Status</th><th className="p-3">Notes</th><th className="p-3">Created</th></tr></thead>
          <tbody>{leads.map(lead => <tr key={lead._id} className="border-t border-zinc-200 align-top"><td className="p-3 font-medium">{lead.name}</td><td className="p-3">{lead.phone}</td><td className="p-3">{lead.inquiryType}</td><td className="p-3">{lead.sourceType}</td><td className="p-3"><select value={lead.status} onChange={e => update(lead._id, { status: e.target.value })} className="rounded-md border border-zinc-300 px-2 py-1">{statuses.map(s => <option key={s}>{s}</option>)}</select></td><td className="p-3"><textarea defaultValue={lead.notes || ''} onBlur={e => update(lead._id, { notes: e.target.value })} className="w-52 rounded-md border border-zinc-300 px-2 py-1" /></td><td className="p-3">{new Date(lead.createdAt).toLocaleString()}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
