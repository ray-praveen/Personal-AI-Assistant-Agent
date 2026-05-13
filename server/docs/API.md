# TaskPilot AI API

All responses use:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {},
  "meta": {}
}
```

## Core Endpoints

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks/:id/cancel`
- `POST /api/approvals/:id/approve`
- `POST /api/approvals/:id/reject`
- `GET /api/calls`
- `POST /api/calls`
- `GET /api/billing/usage`
- `POST /api/billing/checkout`
- `POST /api/slack/events`
- `POST /api/slack/command`
- `POST /api/slack/actions`
- `GET /api/credentials`
- `GET /api/audit`
- `GET /api/admin/overview`

## Production Adapter Notes

The local server uses a persistent JSON database at `server/data/taskpilot.db.json` and safe mock adapters. Replace these seams for production:

- `repositories/*` with Prisma repositories
- `automation.service.js` with Playwright + Claude Computer Use workers
- `voice.service.js` with Vapi, Retell, or Bland provider calls
- `notification.service.js` with Slack Bolt and email delivery
- `secrets.service.js` with AWS Secrets Manager or 1Password Connect
- `billing.service.js` with Stripe subscriptions and metering
