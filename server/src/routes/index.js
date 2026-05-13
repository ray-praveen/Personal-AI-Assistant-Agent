import { Router } from 'express';
import { auditController } from '../controllers/audit.controller.js';
import { credentialController } from '../controllers/credential.controller.js';
import { adminRoutes } from './admin.routes.js';
import { approvalRoutes } from './approval.routes.js';
import { authRoutes } from './auth.routes.js';
import { billingRoutes } from './billing.routes.js';
import { callRoutes } from './call.routes.js';
import { slackRoutes } from './slack.routes.js';
import { taskRoutes } from './task.routes.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/tasks', taskRoutes);
apiRoutes.use('/approvals', approvalRoutes);
apiRoutes.use('/calls', callRoutes);
apiRoutes.use('/billing', billingRoutes);
apiRoutes.use('/slack', slackRoutes);
apiRoutes.use('/admin', adminRoutes);
apiRoutes.get('/audit', auditController.list);
apiRoutes.get('/credentials', credentialController.list);
