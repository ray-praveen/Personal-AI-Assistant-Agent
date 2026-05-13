export const aiService = {
  parseIntent(prompt) {
    const normalized = prompt.toLowerCase();
    const isCall = normalized.includes('/call') || normalized.includes('call ') || normalized.includes('reservation') || normalized.includes('appointment');
    const isForm = normalized.includes('form') || normalized.includes('permission') || normalized.includes('registration');
    const isReturn = normalized.includes('return');
    const isPurchase = normalized.includes('order') || normalized.includes('buy') || normalized.includes('deliver');

    const type = isCall ? 'VOICE_CALL' : isForm ? 'FORM_FILL' : isReturn ? 'RETURN' : isPurchase ? 'PURCHASE' : 'WEB_AUTOMATION';
    return {
      taskType: type === 'VOICE_CALL' ? 'VOICE_CALL' : 'WEB_AUTOMATION',
      action: type,
      target: inferTarget(normalized),
      parameters: {
        requiresApproval: true,
        sourceText: prompt
      },
      requiresClarification: prompt.length < 18,
      confidence: prompt.length < 18 ? 0.68 : 0.93,
      estimatedCost: isCall ? 1.35 : isPurchase ? 1.1 : 0.72
    };
  }
};

function inferTarget(text) {
  if (text.includes('amazon')) return 'Amazon';
  if (text.includes('doordash')) return 'DoorDash';
  if (text.includes('flowers')) return '1-800-Flowers';
  if (text.includes('dmv')) return 'DMV';
  if (text.includes('dental') || text.includes('dentist')) return 'Dental Office';
  return 'General Web';
}
