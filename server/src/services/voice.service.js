import { db, saveDb } from '../repositories/inMemoryDb.js';
import { taskRepository } from '../repositories/taskRepository.js';
import { id } from '../utils/id.js';
import { auditService } from './audit.service.js';

export const voiceService = {
  list(userId) {
    const taskIds = new Set(db.tasks.filter((task) => task.userId === userId).map((task) => task.id));
    return db.calls.filter((call) => taskIds.has(call.taskId));
  },
  create({ userId, objective, phoneNumber, provider = 'VAPI', taskId = null }) {
    const task = taskId ? taskRepository.findById(taskId) : taskRepository.create({
      id: id('task'),
      userId,
      type: 'VOICE_CALL',
      prompt: objective,
      status: 'RUNNING',
      source: 'dashboard',
      estimatedCost: 1.35,
      actualCost: 0,
      result: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const call = {
      id: id('call'),
      taskId: task.id,
      provider,
      status: 'COMPLETED',
      objective,
      phoneNumber: phoneNumber || '+14155550100',
      durationSeconds: 286,
      transcriptUrl: `/mock/transcripts/${task.id}.txt`,
      summary: 'Call completed in sandbox mode. Production adapters can place the real call through Vapi, Retell, or Bland.',
      createdAt: new Date().toISOString()
    };

    db.calls.unshift(call);
    saveDb();
    taskRepository.update(task.id, {
      status: 'COMPLETED',
      actualCost: 1.09,
      result: { summary: call.summary, callId: call.id }
    });
    auditService.log({ userId, taskId: task.id, action: 'VOICE_CALL_COMPLETED', metadata: { provider, callId: call.id } });
    return call;
  }
};
