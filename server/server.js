import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chatRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', project: "AI Real Estate Website", timestamp: new Date().toISOString() }));
app.use('/api/chat', chatRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

const clientDist = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), err => err && next());
});

app.use(errorMiddleware);

export async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not configured. Lead storage endpoints need MongoDB.');
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 5000;
  connectDatabase().catch(err => console.error('MongoDB connection failed:', err.message));
  app.listen(port, () => console.log(`AI Real Estate Website API running on port ${port}`));
}
