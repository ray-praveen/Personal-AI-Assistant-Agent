import { auditService } from '../services/audit.service.js';
import { ok } from '../utils/apiResponse.js';

export const auditController = {
  list(req, res) {
    return ok(res, 'Audit logs retrieved', auditService.list(req.user.id));
  }
};
