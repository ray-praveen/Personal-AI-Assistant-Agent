# TaskPilot AI

TaskPilot AI is a full-stack SaaS prototype for a personal AI chief of staff. It includes a polished React marketing site, application dashboard, and an Express backend that models task orchestration, approvals, voice calls, billing, Slack webhooks, audit logs, and admin analytics.

## Stack

- React + Vite + JavaScript
- React Router, TanStack Query, Zustand, Framer Motion, Recharts, Lucide icons
- Node.js + Express
- Zod validation, JWT-ready auth scaffolding, Helmet, CORS, rate limiting, Pino logging
- Clerk-ready authentication for the React app and Express API
- Persistent local JSON database for development data durability
- Mock adapters for AI parsing, web automation, voice calls, Slack, billing, and secret vaults

## Run Locally

```bash
npm install
npm run dev
```

Client: `http://localhost:5173`

API: `http://localhost:5000`

To enable Clerk auth, add these values to `.env` and restart:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Notes

This project is intentionally safe by default. Real purchases, browser automation, phone calls, Stripe charges, and Slack sends are represented behind service adapters and require real credentials plus implementation hardening before production use.
