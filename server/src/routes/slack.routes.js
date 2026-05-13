import { Router } from 'express';
import { slackController } from '../controllers/slack.controller.js';

export const slackRoutes = Router();

slackRoutes.post('/events', slackController.events);
slackRoutes.post('/command', slackController.command);
slackRoutes.post('/actions', slackController.actions);
