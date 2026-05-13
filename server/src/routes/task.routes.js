import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { validate } from '../middleware/validate.js';
import { createTaskSchema, idParamSchema } from '../validators/schemas.js';

export const taskRoutes = Router();

taskRoutes.get('/', taskController.list);
taskRoutes.post('/', validate(createTaskSchema), taskController.create);
taskRoutes.get('/:id', validate(idParamSchema), taskController.get);
taskRoutes.post('/:id/cancel', validate(idParamSchema), taskController.cancel);
