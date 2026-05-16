export function makeWhatsAppLink(message) {
  return `https://wa.me/880179245859?text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppMessage(intro, fields, source) {
  const lines = [intro, ''];
  fields.forEach(([label, value]) => lines.push(`${label}: ${value || ''}`));
  lines.push(`Source: ${source}`);
  return lines.join('\n');
}
