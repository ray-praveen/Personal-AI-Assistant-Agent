import { fail } from '../utils/apiResponse.js';

export function notFound(req, res) {
  return fail(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
}

export function errorHandler(error, req, res, _next) {
  req.log?.error({ error }, error.message);
  return fail(res, error.status || 500, error.message || 'Internal server error');
}
