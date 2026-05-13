import { db, saveDb } from '../repositories/inMemoryDb.js';
import { id } from '../utils/id.js';

export const auditService = {
  log({ userId, taskId = null, action, metadata = {} }) {
    const entry = {
      id: id('audit'),
      userId,
      taskId,
      action,
      metadata,
      createdAt: new Date().toISOString()
    };
    db.auditLogs.unshift(entry);
    saveDb();
    return entry;
  },
  list(userId) {
    return db.auditLogs.filter((entry) => entry.userId === userId);
  }
};
