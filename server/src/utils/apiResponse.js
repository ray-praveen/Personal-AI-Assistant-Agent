export function ok(res, message, data = {}, meta = {}) {
  return res.json({ success: true, message, data, meta });
}

export function created(res, message, data = {}, meta = {}) {
  return res.status(201).json({ success: true, message, data, meta });
}

export function fail(res, status, message, errors = []) {
  return res.status(status).json({ success: false, message, errors });
}
