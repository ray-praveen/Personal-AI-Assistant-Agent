import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { requireRole } from '../middleware/auth.js';

export const adminRoutes = Router();

adminRoutes.use(requireRole(['ADMIN', 'SUPER_ADMIN']));
adminRoutes.get('/overview', adminController.overview);
adminRoutes.get('/users', adminController.users);
adminRoutes.get('/errors', adminController.errors);
