import { billingService } from '../services/billing.service.js';
import { ok } from '../utils/apiResponse.js';

export const billingController = {
  usage(_req, res) {
    return ok(res, 'Billing usage retrieved', billingService.usage());
  },
  checkout(_req, res) {
    return ok(res, 'Checkout session created', billingService.checkout());
  },
  webhook(req, res) {
    return ok(res, 'Stripe webhook received', { received: true, type: req.body?.type || 'mock.event' });
  }
};
