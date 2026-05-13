import { auditService } from './audit.service.js';

export const notificationService = {
  send(userId, type, payload) {
    auditService.log({ userId, action: `NOTIFICATION_${type}`, metadata: payload });
    return {
      channel: 'in-app',
      type,
      delivered: true,
      payload
    };
  }
};
