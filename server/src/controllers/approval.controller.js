import { approvalService } from '../services/approval.service.js';
import { fail, ok } from '../utils/apiResponse.js';

export const approvalController = {
  approve(req, res) {
    const result = approvalService.approve(req.validated.params.id, req.user.id);
    if (!result) return fail(res, 404, 'Approval not found');
    return ok(res, 'Approval accepted', result);
  },
  reject(req, res) {
    const result = approvalService.reject(req.validated.params.id, req.user.id);
    if (!result) return fail(res, 404, 'Approval not found');
    return ok(res, 'Approval rejected', result);
  }
};
