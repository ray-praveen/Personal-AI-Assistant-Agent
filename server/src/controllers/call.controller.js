import { voiceService } from '../services/voice.service.js';
import { created, ok } from '../utils/apiResponse.js';

export const callController = {
  list(req, res) {
    return ok(res, 'Voice calls retrieved', voiceService.list(req.user.id));
  },
  create(req, res) {
    const call = voiceService.create({ userId: req.user.id, ...req.validated.body });
    return created(res, 'Voice call created', call);
  },
  get(req, res) {
    const call = voiceService.list(req.user.id).find((item) => item.id === req.validated.params.id);
    return ok(res, 'Voice call retrieved', call || null);
  }
};
