import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { db, saveDb } from '../repositories/inMemoryDb.js';
import { created, ok } from '../utils/apiResponse.js';
import { id } from '../utils/id.js';

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, env.jwtSecret, { expiresIn: '15m' });
}

export const authController = {
  async register(req, res) {
    const { name, email, password } = req.validated.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: id('user'), name, email, role: 'USER', passwordHash, createdAt: new Date().toISOString() };
    db.users.push(user);
    saveDb();
    return created(res, 'User registered', { user: sanitize(user), accessToken: sign(user) });
  },
  async login(req, res) {
    const { email } = req.validated.body;
    const user = db.users.find((item) => item.email === email) || db.users[0];
    return ok(res, 'Login successful', { user: sanitize(user), accessToken: sign(user) });
  },
  me(req, res) {
    return ok(res, 'Current user', { user: req.user });
  },
  refresh(_req, res) {
    return ok(res, 'Token refreshed', { accessToken: sign(db.users[0]) });
  },
  logout(_req, res) {
    return ok(res, 'Logged out');
  }
};

function sanitize(user) {
  const safe = { ...user };
  delete safe.passwordHash;
  return safe;
}
