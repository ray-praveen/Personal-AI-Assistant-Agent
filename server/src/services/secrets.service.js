import { db } from '../repositories/inMemoryDb.js';
import { auditService } from './audit.service.js';

export const secretsService = {
  list(userId) {
    return db.credentials.filter((credential) => credential.userId === userId);
  },
  resolve(userId, provider) {
    const credential = db.credentials.find((item) => item.userId === userId && item.provider === provider);
    auditService.log({ userId, action: 'SECRET_REFERENCE_ACCESSED', metadata: { provider } });
    return credential ? { provider, secretReference: credential.secretReference } : null;
  }
};
