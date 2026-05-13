import { taskService } from './task.service.js';

export const slackService = {
  handleCommand({ userId, text }) {
    const cleaned = text.replace(/^\/(do|call)\s*/i, '');
    return taskService.create({ userId, prompt: cleaned, source: 'slack' });
  },
  formatApprovalMessage(task) {
    return {
      text: `Approval required for ${task.prompt}`,
      blocks: [
        { type: 'section', text: { type: 'mrkdwn', text: `*${task.prompt}*\nStatus: ${task.status}` } }
      ]
    };
  }
};
