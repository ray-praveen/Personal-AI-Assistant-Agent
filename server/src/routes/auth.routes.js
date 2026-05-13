import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validators/schemas.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.post('/refresh', authController.refresh);
authRoutes.post('/logout', authController.logout);
authRoutes.get('/me', authController.me);
