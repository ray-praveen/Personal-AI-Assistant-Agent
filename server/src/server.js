import { env } from './config/env.js';
import { createApp } from './app.js';
import { logger } from './utils/logger.js';

const app = createApp();

function listen(port, remainingAttempts = 10) {
  const server = app.listen(port);

  server.on('listening', () => {
    logger.info({ port }, `TaskPilot API listening on ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && env.nodeEnv !== 'production' && remainingAttempts > 0) {
      const nextPort = port + 1;
      logger.warn({ port, nextPort }, `Port ${port} is in use; trying ${nextPort}`);
      listen(nextPort, remainingAttempts - 1);
      return;
    }

    logger.error({ error, port }, 'TaskPilot API failed to start');
    process.exitCode = 1;
  });
}

listen(env.port);
