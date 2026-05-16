import Hero from '../components/Hero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import ShowcaseSection from '../components/ShowcaseSection.jsx';
import FAQSection from '../components/FAQSection.jsx';
import ContactForm from '../components/ContactForm.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import { siteContent } from '../data/siteContent.js';

export default function Home() {
  return <><Hero /><ServicesSection /><ShowcaseSection /><FAQSection /><section className="bg-zinc-950 py-14 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><h2 className="text-2xl font-semibold">Prefer a fast reply?</h2><p className="mt-2 text-white/75">Send a prefilled WhatsApp inquiry now.</p></div><WhatsAppCTA message={siteContent.contactMessage}>Contact on WhatsApp</WhatsAppCTA></div></section><section className="bg-white py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Contact</p><h2 className="mt-2 text-3xl font-semibold">Capture your inquiry in one minute</h2></div><ContactForm /></div></section></>;
}
