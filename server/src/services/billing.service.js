export const billingService = {
  usage() {
    return {
      cycle: 'May 2026',
      plan: 'Executive',
      subscriptionStatus: 'ACTIVE',
      usage: {
        webTasks: 74,
        voiceMinutes: 126,
        approvals: 42,
        storageGb: 6
      },
      costEstimate: {
        claude: 124,
        voice: 54,
        hosting: 38,
        storage: 8,
        total: 224
      }
    };
  },
  checkout() {
    return {
      url: 'https://billing.stripe.com/mock/taskpilot',
      mode: 'test'
    };
  }
};
