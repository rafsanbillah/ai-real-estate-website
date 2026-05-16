import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from './Icon.jsx';
import { siteContent } from '../data/siteContent.js';

const links = [
  ['/', siteContent.pages.home],
  ['/properties', siteContent.pages.services],
  ['/buy-rent', siteContent.pages.extra],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-zinc-900 text-white"><Icon name="Home" /></span>
          <span>{siteContent.business}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([href, label]) => <NavLink key={href} to={href} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-zinc-950' : 'text-zinc-600 hover:text-zinc-950'}`}>{label}</NavLink>)}
          <NavLink to="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-zinc-950">Dashboard</NavLink>
          {localStorage.getItem('token') && <button onClick={logout} className="rounded-md border border-zinc-300 p-2" title="Log out"><Icon name="LogOut" /></button>}
        </nav>
        <button className="rounded-md border border-zinc-300 p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name={open ? 'X' : 'Menu'} /></button>
      </div>
      {open && <div className="border-t border-zinc-200 bg-white px-4 py-3 md:hidden">{links.map(([href, label]) => <NavLink key={href} to={href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-zinc-700">{label}</NavLink>)}<NavLink to="/dashboard" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-zinc-700">Dashboard</NavLink></div>}
    </header>
  );
}
