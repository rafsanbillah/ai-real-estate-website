import { getMockReply } from '../services/mockAiService.js';
import { getOpenAiReply } from '../services/openAiService.js';

export async function chat(req, res, next) {
  try {
    const { message = '', history = [] } = req.body;
    const mode = process.env.AI_MODE || 'mock';
    const reply = mode === 'openai' ? await getOpenAiReply(message, history) : getMockReply(message);
    res.json({ reply, mode: mode === 'openai' && process.env.OPENAI_API_KEY ? 'openai' : 'mock' });
  } catch (error) {
    next(error);
  }
}
