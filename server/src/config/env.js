export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  clerkSecretKey: process.env.CLERK_SECRET_KEY || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-taskpilot-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-only-taskpilot-refresh-secret',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  slackBotToken: process.env.SLACK_BOT_TOKEN || '',
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET || '',
  vapiApiKey: process.env.VAPI_API_KEY || '',
  retellApiKey: process.env.RETELL_API_KEY || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || ''
};
