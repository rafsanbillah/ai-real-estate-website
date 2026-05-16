import LeadTable from '../components/LeadTable.jsx';
import { siteContent } from '../data/siteContent.js';
export default function Dashboard() { return <main className="bg-zinc-100 px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-semibold">{siteContent.business} dashboard</h1><p className="mt-2 text-sm text-zinc-600">Manage leads, statuses, notes, and CSV export.</p><div className="mt-6"><LeadTable /></div></div></main>; }
