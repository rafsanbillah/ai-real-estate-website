# PrimeNest Realty

AI Real Estate Website is a standalone MERN lead capture website for PrimeNest Realty. It uses WhatsApp-first conversion, a mock-by-default AI chatbot, MongoDB lead storage, and a protected admin dashboard.

## Features

- React + Vite frontend with responsive pages.
- Express + Mongoose backend.
- Mock AI chatbot by default with optional OpenAI mode.
- WhatsApp CTA links with prefilled messages.
- Contact form and chatbot lead capture.
- JWT-protected dashboard.
- Lead status and notes management.
- CSV export.
- Render-ready single web service deployment.

## Tech Stack

React, Vite, React Router, Tailwind CSS, Lucide React, Node.js, Express, MongoDB Atlas, Mongoose, dotenv, cors, jsonwebtoken, json2csv.

## Local Setup

```bash
npm run install-all
Copy-Item server/.env.example server/.env
npm run build
npm start
```

For development:

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000
Health: http://localhost:5000/api/health

## Environment Variables

Create `server/.env` from `server/.env.example` and set:

- PORT=5000
- CLIENT_URL=http://localhost:5173
- MONGO_URI=your MongoDB Atlas connection string
- LEADS_COLLECTION=real_estate_leads
- ADMIN_EMAIL=admin@example.com
- ADMIN_PASSWORD=admin123
- JWT_SECRET=replace with a secure random value
- AI_MODE=mock
- OPENAI_API_KEY=optional
- NODE_ENV=development

Do not commit `.env`.

## Demo Routes

- /
- /services or /properties
- /faq
- /contact
- /login
- /dashboard

## Tests

```bash
npm test
```

## Render Deployment

Use one Render Web Service connected to this GitHub repository.

- Build command: `npm run build`
- Start command: `npm start`
- Health check path: `/api/health`
- Node version: 22.x

Add the environment variables listed above in Render. Keep `AI_MODE=mock` unless you add `OPENAI_API_KEY`.

## Future Improvements

- Add email notifications for new leads.
- Add richer dashboard analytics.
- Add role-based admin users.
- Add image upload support for service/property inquiries.
