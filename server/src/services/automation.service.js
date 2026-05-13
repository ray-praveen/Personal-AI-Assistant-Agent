import { db, saveDb } from '../repositories/inMemoryDb.js';
import { id } from '../utils/id.js';
import { approvalService } from './approval.service.js';

export const automationService = {
  startWebTask(task) {
    const startedAt = new Date().toISOString();
    db.taskSteps.push({
      id: id('step'),
      taskId: task.id,
      stepNumber: 1,
      action: `Parsed target ${task.intent.target}`,
      screenshotUrl: `/mock/screenshots/${task.id}-001.png`,
      createdAt: startedAt
    });
    db.taskSteps.push({
      id: id('step'),
      taskId: task.id,
      stepNumber: 2,
      action: 'Reached confirmation checkpoint',
      screenshotUrl: `/mock/screenshots/${task.id}-002.png`,
      createdAt: new Date().toISOString()
    });
    saveDb();

    return approvalService.createForTask(
      task,
      `Approve ${task.intent.action} on ${task.intent.target}. Estimated cost: $${Number(task.estimatedCost).toFixed(2)}.`
    );
  }
};
