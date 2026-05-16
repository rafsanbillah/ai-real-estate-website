import Lead from '../models/Lead.js';
import { leadsToCsv } from '../services/csvExportService.js';

export async function createLead(req, res, next) {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
}

export async function getLeads(req, res, next) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.sourceType) filter.sourceType = req.query.sourceType;
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(500);
    res.json(leads);
  } catch (error) {
    next(error);
  }
}

export async function updateLead(req, res, next) {
  try {
    const allowed = ['status', 'notes'];
    const patch = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const lead = await Lead.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    next(error);
  }
}

export async function exportLeads(req, res, next) {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    const csv = leadsToCsv(leads);
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
}
