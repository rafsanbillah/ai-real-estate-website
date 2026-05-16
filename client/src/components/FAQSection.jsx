import { siteContent } from '../data/siteContent.js';

export default function FAQSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-zinc-950">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white">
          {siteContent.faq.map(([q, a]) => <details key={q} className="group p-5"><summary className="cursor-pointer list-none font-semibold text-zinc-950">{q}</summary><p className="mt-3 text-sm leading-6 text-zinc-600">{a}</p></details>)}
        </div>
      </div>
    </section>
  );
}
