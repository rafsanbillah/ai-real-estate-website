# Render Deployment

## Service

Create one Render Web Service for this repository.

## Build Command

```bash
npm run build
```

## Start Command

```bash
npm start
```

## Environment Variables

- MONGO_URI
- LEADS_COLLECTION=real_estate_leads
- ADMIN_EMAIL
- ADMIN_PASSWORD
- JWT_SECRET
- AI_MODE=mock
- OPENAI_API_KEY optional
- NODE_ENV=production

## Health Check

Use `/api/health`.

Expected URL format: `https://ai-real-estate-website.onrender.com/api/health`.
