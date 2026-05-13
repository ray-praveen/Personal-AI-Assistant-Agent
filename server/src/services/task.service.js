import { taskRepository } from '../repositories/taskRepository.js';
import { id } from '../utils/id.js';
import { aiService } from './ai.service.js';
import { auditService } from './audit.service.js';
import { automationService } from './automation.service.js';
import { notificationService } from './notification.service.js';
import { voiceService } from './voice.service.js';

export const taskService = {
  list(userId) {
    return taskRepository.list(userId);
  },
  get(id) {
    return taskRepository.findById(id);
  },
  create({ userId, prompt, source, attachments = [] }) {
    const intent = aiService.parseIntent(prompt);
    const task = taskRepository.create({
      id: id('task'),
      userId,
      type: intent.taskType,
      prompt,
      source,
      attachments,
      status: 'QUEUED',
      estimatedCost: intent.estimatedCost,
      actualCost: 0,
      intent,
      result: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    auditService.log({ userId, taskId: task.id, action: 'TASK_CREATED', metadata: { source, intent } });
    notificationService.send(userId, 'TASK_STARTED', { taskId: task.id, status: task.status });

    if (intent.taskType === 'VOICE_CALL') {
      voiceService.create({ userId, objective: prompt, taskId: task.id });
    } else {
      taskRepository.update(task.id, { status: 'RUNNING' });
      automationService.startWebTask(task);
    }

    return taskRepository.findById(task.id);
  },
  cancel(id, userId) {
    const task = taskRepository.update(id, { status: 'CANCELLED', result: { summary: 'Task cancelled by user.' } });
    if (task) auditService.log({ userId, taskId: id, action: 'TASK_CANCELLED' });
    return task;
  }
};
