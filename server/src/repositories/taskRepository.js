import { db, saveDb } from './inMemoryDb.js';

export const taskRepository = {
  list(userId) {
    return db.tasks.filter((task) => task.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  findById(id) {
    return db.tasks.find((task) => task.id === id);
  },
  create(task) {
    db.tasks.unshift(task);
    saveDb();
    return task;
  },
  update(id, patch) {
    const task = this.findById(id);
    if (!task) return null;
    Object.assign(task, patch, { updatedAt: new Date().toISOString() });
    saveDb();
    return task;
  }
};
