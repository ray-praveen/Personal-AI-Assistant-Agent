import { db } from '../repositories/inMemoryDb.js';

export const adminService = {
  overview() {
    return {
      stats: {
        tasksCompleted: db.tasks.filter((task) => task.status === 'COMPLETED').length,
        pendingApprovals: db.tasks.filter((task) => task.status === 'WAITING_APPROVAL').length,
        successRate: 91.8,
        monthlySpend: 312
      },
      trend: [
        { day: 'Mon', tasks: 16, cost: 42 },
        { day: 'Tue', tasks: 22, cost: 58 },
        { day: 'Wed', tasks: 19, cost: 51 },
        { day: 'Thu', tasks: 31, cost: 78 },
        { day: 'Fri', tasks: 27, cost: 63 },
        { day: 'Sat', tasks: 14, cost: 36 },
        { day: 'Sun', tasks: 18, cost: 44 }
      ],
      queues: [
        { name: 'task-queue', depth: 7, health: 'healthy' },
        { name: 'automation-queue', depth: 3, health: 'healthy' },
        { name: 'voice-queue', depth: 2, health: 'healthy' },
        { name: 'notification-queue', depth: 0, health: 'healthy' }
      ]
    };
  }
};
