import Icon from './Icon.jsx';
import WhatsAppCTA from './WhatsAppCTA.jsx';
import { siteContent } from '../data/siteContent.js';

export default function Hero() {
  return (
    <section className="relative min-h-[640px] overflow-hidden bg-zinc-950 text-white">
      <img src={siteContent.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${siteContent.theme.hero}`} />
      <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm"><Icon name="MapPin" />{siteContent.location}</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{siteContent.business}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/88">{siteContent.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCTA message={siteContent.contactMessage}>Start on WhatsApp</WhatsAppCTA>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20">Send inquiry <Icon name="ArrowRight" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
