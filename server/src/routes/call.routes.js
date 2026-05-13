import { Router } from 'express';
import { callController } from '../controllers/call.controller.js';
import { validate } from '../middleware/validate.js';
import { createCallSchema, idParamSchema } from '../validators/schemas.js';

export const callRoutes = Router();

callRoutes.get('/', callController.list);
callRoutes.post('/', validate(createCallSchema), callController.create);
callRoutes.get('/:id', validate(idParamSchema), callController.get);
