import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  inquiryType: { type: String, required: true, trim: true },
  message: { type: String, trim: true, default: '' },
  sourceType: { type: String, enum: ['chatbot', 'contact-form', 'manual'], default: 'contact-form' },
  sourcePage: { type: String, default: '' },
  qualificationData: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Closed'], default: 'New' },
  notes: { type: String, default: '' }
}, { timestamps: true, collection: process.env.LEADS_COLLECTION || "real_estate_leads" });

export default mongoose.model('Lead', leadSchema);
