import { Parser } from 'json2csv';

export function leadsToCsv(leads) {
  const parser = new Parser({ fields: ['name', 'phone', 'email', 'inquiryType', 'message', 'sourceType', 'sourcePage', 'status', 'notes', 'createdAt'] });
  return parser.parse(leads.map(lead => lead.toObject ? lead.toObject() : lead));
}
