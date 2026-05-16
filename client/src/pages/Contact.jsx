import ContactForm from '../components/ContactForm.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import { siteContent } from '../data/siteContent.js';
export default function Contact() { return <main className="bg-white"><section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Contact</p><h1 className="mt-2 text-4xl font-semibold">{siteContent.business}</h1><p className="mt-4 text-zinc-600">{siteContent.location}</p><div className="mt-6"><WhatsAppCTA message={siteContent.contactMessage}>WhatsApp contact</WhatsAppCTA></div></div><ContactForm /></section></main>; }
