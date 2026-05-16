import { getMockReply } from './mockAiService.js';

export async function getOpenAiReply(message, history = []) {
  if (!process.env.OPENAI_API_KEY) return getMockReply(message);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a cautious lead capture assistant for PrimeNest Realty in Dhaka. Answer only from provided business context. Recommend WhatsApp for exact availability, pricing, medical, property, or service-sensitive details. Never invent details.' },
          ...history.slice(-6).map(item => ({ role: item.role === 'bot' ? 'assistant' : 'user', content: item.text || '' })),
          { role: 'user', content: message }
        ],
        temperature: 0.2
      })
    });
    if (!response.ok) return getMockReply(message);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || getMockReply(message);
  } catch {
    return getMockReply(message);
  }
}
