import { db } from '../repositories/inMemoryDb.js';
import { adminService } from '../services/admin.service.js';
import { ok } from '../utils/apiResponse.js';

export const adminController = {
  overview(_req, res) {
    return ok(res, 'Admin overview retrieved', adminService.overview());
  },
  users(_req, res) {
    return ok(res, 'Users retrieved', db.users.map(({ passwordHash: _passwordHash, ...user }) => user));
  },
  errors(_req, res) {
    return ok(res, 'Error queue retrieved', [
      { id: 'err_1', level: 'warning', message: 'DoorDash selector changed', createdAt: new Date().toISOString() },
      { id: 'err_2', level: 'error', message: 'Voice webhook signature missing', createdAt: new Date().toISOString() }
    ]);
  }
};
