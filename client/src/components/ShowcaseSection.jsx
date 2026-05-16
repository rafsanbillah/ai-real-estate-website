import { siteContent } from '../data/siteContent.js';

export default function ShowcaseSection() {
  return (
    <section className="bg-zinc-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{siteContent.showcaseTitle}</p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950">{siteContent.showcaseIntro}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.showcase.map(([title, meta, text]) => <article key={title} className="rounded-md bg-white p-5 shadow-sm ring-1 ring-zinc-200"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-1 text-sm font-medium text-zinc-500">{meta}</p><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
