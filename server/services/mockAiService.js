const mockData = {
  "fallback": "I can connect you on WhatsApp for the most accurate answer.",
  "topics": [
    {
      "question": "Can you help me buy or rent?",
      "answer": "Yes. Share whether you want to buy or rent, your area, property type, and budget."
    },
    {
      "question": "How do viewings work?",
      "answer": "Send a viewing inquiry and the team will confirm timing and property availability on WhatsApp."
    },
    {
      "question": "Which areas are covered?",
      "answer": "Demo listings include Bashundhara, Mirpur, Gulshan, and Banani in Dhaka."
    },
    {
      "question": "Can I share my budget first?",
      "answer": "Yes. Budget range helps us recommend realistic options."
    },
    {
      "question": "Do you confirm availability?",
      "answer": "Availability changes, so the team confirms current options directly on WhatsApp."
    }
  ],
  "quickTopics": [
    "property type",
    "buy or rent",
    "preferred area",
    "budget range",
    "viewing process",
    "contact details",
    "WhatsApp inquiry"
  ]
};

export function getMockReply(message = '') {
  const normalized = message.toLowerCase();
  const match = mockData.topics.find(item => {
    const words = item.question.toLowerCase().split(/\W+/).filter(Boolean);
    return words.some(word => word.length > 3 && normalized.includes(word));
  });
  if (match) return match.answer;
  if (/whatsapp|phone|contact|book|quote|appointment|viewing/i.test(message)) {
    return 'Please share your details here or continue on WhatsApp for the fastest response.';
  }
  return mockData.fallback;
}
