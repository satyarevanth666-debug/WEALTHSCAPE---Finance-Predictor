Wealthscape Contact Server
-------------------------

This small Express server accepts POST requests at `/api/contact` and sends an email to the address specified in `OWNER_EMAIL` using SMTP credentials.

Setup

1. Copy `.env.example` to `.env` and fill in values:

```
OWNER_EMAIL=owner@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASS=supersecret
```

2. Install dependencies and run:

```bash
cd server
npm install
npm start
```

3. By default the server listens on port `3000`. When running alongside your static site during development, ensure the frontend posts to `http://localhost:3000/api/contact` (or use a reverse proxy / host both together).

Deployment

- Host the server on any Node-capable host (Heroku, Render, Railway, VPS) and set environment variables there.
- Use a transactional email provider (SendGrid, Mailgun, Postmark) SMTP credentials for reliable delivery.

Security & Notes

- Keep SMTP credentials secret. Do not commit `.env` to source control.
- If your frontend is served from a different origin, configure CORS or adjust the fetch URL to point at the deployed server.
