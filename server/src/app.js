import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { clerkMiddleware } from '@clerk/express';
import { env } from './config/env.js';
import { attachUser } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiRoutes } from './routes/index.js';
import { ok } from './utils/apiResponse.js';
import { logger } from './utils/logger.js';

export function createApp() {
  const app = express();

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
  }));
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  if (env.clerkSecretKey) {
    app.use(clerkMiddleware());
  }
  app.use(express.json({ limit: '2mb' }));
  app.use(pinoHttp({ logger }));
  app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }));
  app.use(attachUser);

  app.get('/health', (_req, res) => ok(res, 'TaskPilot API healthy', {
    service: 'taskpilot-api',
    timestamp: new Date().toISOString(),
    database: {
      provider: 'local-json',
      durable: true
    },
    integrations: {
      anthropic: Boolean(env.anthropicApiKey),
      slack: Boolean(env.slackBotToken),
      voice: Boolean(env.vapiApiKey || env.retellApiKey),
      stripe: Boolean(env.stripeSecretKey)
    }
  }));

  app.use('/api', apiRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
