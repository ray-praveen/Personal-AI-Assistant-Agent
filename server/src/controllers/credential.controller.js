import { secretsService } from '../services/secrets.service.js';
import { ok } from '../utils/apiResponse.js';

export const credentialController = {
  list(req, res) {
    return ok(res, 'Credentials retrieved', secretsService.list(req.user.id));
  }
};
