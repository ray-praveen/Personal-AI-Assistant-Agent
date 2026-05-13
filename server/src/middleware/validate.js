import { fail } from '../utils/apiResponse.js';

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return fail(res, 400, 'Validation error', result.error.errors);
    }

    req.validated = result.data;
    return next();
  };
}
