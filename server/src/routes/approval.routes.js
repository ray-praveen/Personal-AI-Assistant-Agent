import { Router } from 'express';
import { approvalController } from '../controllers/approval.controller.js';
import { validate } from '../middleware/validate.js';
import { idParamSchema } from '../validators/schemas.js';

export const approvalRoutes = Router();

approvalRoutes.post('/:id/approve', validate(idParamSchema), approvalController.approve);
approvalRoutes.post('/:id/reject', validate(idParamSchema), approvalController.reject);
