import Icon from './Icon.jsx';
import { makeWhatsAppLink } from '../utils/whatsapp.js';

export default function WhatsAppCTA({ message, children = 'WhatsApp us' }) {
  return <a href={makeWhatsAppLink(message)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"><Icon name="MessageCircle" />{children}</a>;
}
