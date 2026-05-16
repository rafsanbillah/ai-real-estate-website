import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';

export default function Login() {
  const [form, setForm] = useState({ email: 'admin@example.com', password: 'admin123' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); try { const data = await api.login(form); localStorage.setItem('token', data.token); navigate('/dashboard'); } catch (err) { setError(err.message); } };
  return <main className="grid min-h-[calc(100vh-65px)] place-items-center bg-zinc-100 px-4"><form onSubmit={submit} className="w-full max-w-md rounded-md border border-zinc-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-semibold">Admin login</h1><label className="mt-5 block text-sm font-medium">Email<input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2" /></label><label className="mt-4 block text-sm font-medium">Password<input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2" /></label>{error && <p className="mt-3 text-sm text-red-600">{error}</p>}<button className="mt-5 w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white">Login</button></form></main>;
}
