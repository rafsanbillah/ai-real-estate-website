import { useState } from 'react';
import Icon from './Icon.jsx';
import { api } from '../utils/api.js';
import { makeWhatsAppLink } from '../utils/whatsapp.js';
import { siteContent } from '../data/siteContent.js';

const leadQuestions = [
  [
    "lookingTo",
    "Are you looking to buy or rent?"
  ],
  [
    "propertyType",
    "What property type do you prefer?"
  ],
  [
    "preferredArea",
    "Which area do you prefer?"
  ],
  [
    "budget",
    "What is your budget range?"
  ],
  [
    "name",
    "What is your name?"
  ],
  [
    "phone",
    "What phone number should we contact?"
  ],
  [
    "message",
    "Any extra property notes?"
  ]
];
const intro = 'Hi, I can answer quick questions or collect your inquiry for WhatsApp follow-up.';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: intro }]);
  const [input, setInput] = useState('');
  const [collecting, setCollecting] = useState(false);
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState({});
  const [waLink, setWaLink] = useState('');

  const add = (role, text) => setMessages(prev => [...prev, { role, text }]);
  const startLead = () => { setCollecting(true); setStep(0); add('bot', leadQuestions[0][1]); };
  const finishLead = async (nextLead) => {
    const msg = ["Hi, I am interested in a property.", '', `Name: ${nextLead.name || ''}`, `Phone: ${nextLead.phone || ''}`, `Looking To: ${nextLead.lookingTo || ''}`, `Property Type: ${nextLead.propertyType || ''}`, `Preferred Area: ${nextLead.preferredArea || ''}`, `Budget: ${nextLead.budget || ''}`, `Message: ${nextLead.message || ''}`, "Source: Real estate website chatbot"].join('\n');
    try {
      await api.createLead({
        name: nextLead.name || 'Chatbot visitor',
        phone: nextLead.phone || '',
        email: '',
        inquiryType: "Buy",
        message: nextLead.message || nextLead.jobDetails || 'Chatbot inquiry',
        sourceType: 'chatbot',
        sourcePage: 'Chatbot widget',
        qualificationData: nextLead
      });
      setWaLink(makeWhatsAppLink(msg));
      add('bot', 'Thanks. Your inquiry was saved. Tap the WhatsApp button for the fastest follow-up.');
    } catch (error) {
      setWaLink(makeWhatsAppLink(msg));
      add('bot', 'I could not save the inquiry right now, but you can continue on WhatsApp.');
    }
    setCollecting(false);
  };

  const send = async (preset) => {
    const text = preset || input.trim();
    if (!text) return;
    setInput('');
    add('user', text);
    if (collecting) {
      const [key] = leadQuestions[step];
      const nextLead = { ...lead, [key]: text };
      setLead(nextLead);
      const nextStep = step + 1;
      if (nextStep < leadQuestions.length) { setStep(nextStep); add('bot', leadQuestions[nextStep][1]); }
      else await finishLead(nextLead);
      return;
    }
    if (/lead|book|quote|inquiry|appointment|viewing|contact/i.test(text)) { startLead(); return; }
    try {
      const data = await api.chat({ message: text, history: messages });
      add('bot', data.reply);
    } catch (error) {
      add('bot', 'I can connect you on WhatsApp for the most accurate answer.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && <div className="mb-3 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-md border border-zinc-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-zinc-950 px-4 py-3 text-white"><span className="flex items-center gap-2 text-sm font-semibold"><Icon name="Bot" />AI assistant</span><button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-white/10" aria-label="Close chatbot"><Icon name="X" /></button></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map((m, i) => <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[82%] rounded-md px-3 py-2 text-sm leading-6 ${m.role === 'user' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-800'}`}>{m.text}</p></div>)}</div>
        <div className="border-t border-zinc-200 p-3">
          <div className="mb-2 flex flex-wrap gap-2"><button onClick={() => send('What services do you offer?')} className="rounded-md bg-zinc-100 px-2 py-1 text-xs">FAQ</button><button onClick={() => send('Start inquiry')} className="rounded-md bg-zinc-100 px-2 py-1 text-xs">Start inquiry</button>{waLink && <a href={waLink} target="_blank" rel="noreferrer" className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">WhatsApp</a>}</div>
          <div className="flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Type a message" /><button onClick={() => send()} className="rounded-md bg-zinc-900 p-2 text-white" aria-label="Send"><Icon name="Send" /></button></div>
        </div>
      </div>}
      <button onClick={() => setOpen(!open)} className="grid h-14 w-14 place-items-center rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700" aria-label="Open chatbot"><Icon name="MessageCircle" /></button>
    </div>
  );
}
