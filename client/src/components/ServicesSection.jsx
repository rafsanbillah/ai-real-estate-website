import Icon from './Icon.jsx';
import { siteContent } from '../data/siteContent.js';

export default function ServicesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{siteContent.pages.services}</p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950">Focused support for qualified inquiries</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.services.map(([title, text, icon]) => <article key={title} className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"><div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-zinc-100"><Icon name={icon} /></div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
