import { slackService } from '../services/slack.service.js';
import { created, ok } from '../utils/apiResponse.js';

export const slackController = {
  events(req, res) {
    return ok(res, 'Slack event received', { event: req.body?.type || 'mock' });
  },
  command(req, res) {
    const task = slackService.handleCommand({ userId: req.user.id, text: req.body?.text || req.body?.command || '' });
    return created(res, 'Slack command queued', { task });
  },
  actions(req, res) {
    return ok(res, 'Slack action received', { payload: req.body });
  }
};
