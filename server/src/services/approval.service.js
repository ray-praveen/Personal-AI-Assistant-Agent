import { db, saveDb } from '../repositories/inMemoryDb.js';
import { taskRepository } from '../repositories/taskRepository.js';
import { id } from '../utils/id.js';
import { auditService } from './audit.service.js';

export const approvalService = {
  createForTask(task, summary) {
    const approval = {
      id: id('approval'),
      taskId: task.id,
      status: 'PENDING',
      summary,
      screenshotUrl: `/mock/screenshots/${task.id}.png`,
      requestedAt: new Date().toISOString(),
      respondedAt: null
    };
    db.approvals.unshift(approval);
    saveDb();
    taskRepository.update(task.id, { status: 'WAITING_APPROVAL', approvalId: approval.id });
    auditService.log({ userId: task.userId, taskId: task.id, action: 'APPROVAL_REQUESTED', metadata: { approvalId: approval.id } });
    return approval;
  },
  approve(approvalId, userId) {
    const approval = db.approvals.find((item) => item.id === approvalId) || db.approvals[0];
    if (!approval) return null;
    approval.status = 'APPROVED';
    approval.respondedAt = new Date().toISOString();
    saveDb();
    const task = taskRepository.update(approval.taskId, {
      status: 'COMPLETED',
      actualCost: taskRepository.findById(approval.taskId)?.estimatedCost || 0,
      result: { summary: 'Approved action completed successfully.' }
    });
    auditService.log({ userId, taskId: approval.taskId, action: 'APPROVAL_APPROVED', metadata: { approvalId } });
    return { approval, task };
  },
  reject(approvalId, userId) {
    const approval = db.approvals.find((item) => item.id === approvalId) || db.approvals[0];
    if (!approval) return null;
    approval.status = 'REJECTED';
    approval.respondedAt = new Date().toISOString();
    saveDb();
    const task = taskRepository.update(approval.taskId, { status: 'REJECTED', result: { summary: 'User rejected the action.' } });
    auditService.log({ userId, taskId: approval.taskId, action: 'APPROVAL_REJECTED', metadata: { approvalId } });
    return { approval, task };
  }
};
