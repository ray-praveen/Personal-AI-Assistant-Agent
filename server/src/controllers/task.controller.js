import { taskService } from '../services/task.service.js';
import { created, fail, ok } from '../utils/apiResponse.js';

export const taskController = {
  list(req, res) {
    return ok(res, 'Tasks retrieved', taskService.list(req.user.id));
  },
  get(req, res) {
    const task = taskService.get(req.validated.params.id);
    if (!task) return fail(res, 404, 'Task not found');
    return ok(res, 'Task retrieved', task);
  },
  create(req, res) {
    const task = taskService.create({ userId: req.user.id, ...req.validated.body });
    return created(res, 'Task created successfully', { task });
  },
  cancel(req, res) {
    const task = taskService.cancel(req.validated.params.id, req.user.id);
    if (!task) return fail(res, 404, 'Task not found');
    return ok(res, 'Task cancelled', task);
  }
};
