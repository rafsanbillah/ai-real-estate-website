import { useState } from 'react';
import { api } from '../utils/api.js';
import { makeWhatsAppLink } from '../utils/whatsapp.js';
import { siteContent } from '../data/siteContent.js';

const initial = { name: '', phone: '', email: '', inquiryType: siteContent.inquiryTypes[0], message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setStatus('Saving inquiry...');
    try {
      await api.createLead({ ...form, sourceType: 'contact-form', sourcePage: 'Contact', qualificationData: { inquiryType: form.inquiryType } });
      const msg = [siteContent.contactMessage, '', `Name: ${form.name}`, `Phone: ${form.phone}`, `Inquiry Type: ${form.inquiryType}`, `Message: ${form.message}`, 'Source: Contact form'].join('\n');
      setWhatsApp(makeWhatsAppLink(msg));
      setStatus('Inquiry saved. You can continue on WhatsApp for the fastest response.');
      setForm(initial);
    } catch (error) {
      setStatus(error.message);
    }
  };
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Name<input required name="name" value={form.name} onChange={update} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2" /></label>
        <label className="text-sm font-medium">Phone<input required name="phone" value={form.phone} onChange={update} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2" /></label>
      </div>
      <label className="text-sm font-medium">Email<input type="email" name="email" value={form.email} onChange={update} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2" /></label>
      <label className="text-sm font-medium">Inquiry type<select name="inquiryType" value={form.inquiryType} onChange={update} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2">{siteContent.inquiryTypes.map(type => <option key={type}>{type}</option>)}</select></label>
      <label className="text-sm font-medium">Message<textarea required name="message" rows="5" value={form.message} onChange={update} className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2" /></label>
      <button className={`rounded-md px-4 py-3 text-sm font-semibold text-white ${siteContent.theme.button}`}>Submit inquiry</button>
      {status && <p className="text-sm text-zinc-700">{status}</p>}
      {whatsApp && <a className="rounded-md bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700" href={whatsApp} target="_blank" rel="noreferrer">Continue on WhatsApp</a>}
    </form>
  );
}
