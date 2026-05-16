import { Building2, KeyRound, CalendarCheck, BadgeDollarSign, Menu, X, MessageCircle, Send, Phone, MapPin, ArrowRight, Bot, UserRound, Download, LogOut, Filter, Save, Eye, Home, ShieldCheck } from 'lucide-react';

const icons = { Building2, KeyRound, CalendarCheck, BadgeDollarSign, Menu, X, MessageCircle, Send, Phone, MapPin, ArrowRight, Bot, UserRound, Download, LogOut, Filter, Save, Eye, Home, ShieldCheck };

export default function Icon({ name, className = 'h-5 w-5' }) {
  const Component = icons[name] || ShieldCheck;
  return <Component className={className} aria-hidden="true" />;
}
