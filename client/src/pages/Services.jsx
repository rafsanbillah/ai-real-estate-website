import ServicesSection from '../components/ServicesSection.jsx';
import ShowcaseSection from '../components/ShowcaseSection.jsx';
import WhatsAppCTA from '../components/WhatsAppCTA.jsx';
import { siteContent } from '../data/siteContent.js';

export default function Services() {
  return <main><section className="bg-zinc-950 px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><h1 className="text-4xl font-semibold">{siteContent.pages.services}</h1><p className="mt-3 max-w-2xl text-white/75">{siteContent.tagline}</p><div className="mt-6"><WhatsAppCTA message={siteContent.contactMessage}>Ask on WhatsApp</WhatsAppCTA></div></div></section><ServicesSection /><ShowcaseSection /></main>;
}
