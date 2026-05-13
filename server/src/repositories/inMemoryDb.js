import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../../data');
const dataFile = path.join(dataDir, 'taskpilot.db.json');
const now = new Date().toISOString();

const seed = {
  users: [
    {
      id: 'user_demo',
      name: 'Praveen Ray',
      email: 'praveen@taskpilot.ai',
      role: 'ADMIN',
      passwordHash: '$2a$10$demo',
      createdAt: now
    }
  ],
  tasks: [
    {
      id: 'task_1001',
      userId: 'user_demo',
      type: 'WEB_AUTOMATION',
      prompt: 'Initiate a return for my last Amazon order, the kitchen scale',
      status: 'COMPLETED',
      source: 'slack',
      estimatedCost: 0.74,
      actualCost: 0.69,
      result: { summary: 'Return label generated and saved.' },
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'task_1002',
      userId: 'user_demo',
      type: 'VOICE_CALL',
      prompt: 'Schedule a dental cleaning any morning next week',
      status: 'COMPLETED',
      source: 'dashboard',
      estimatedCost: 1.2,
      actualCost: 1.06,
      result: { summary: 'Tuesday 10:30am appointment held.' },
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'task_1003',
      userId: 'user_demo',
      type: 'WEB_AUTOMATION',
      prompt: 'Order 2 dozen red roses from 1-800-Flowers, deliver Saturday',
      status: 'WAITING_APPROVAL',
      source: 'slack',
      estimatedCost: 128.4,
      actualCost: 0,
      approvalId: 'approval_1003',
      result: { summary: 'Cart prepared and awaiting approval.' },
      createdAt: now,
      updatedAt: now
    }
  ],
  approvals: [
    {
      id: 'approval_1003',
      taskId: 'task_1003',
      status: 'PENDING',
      summary: 'Approve purchase of 2 dozen red roses for Saturday delivery. Total: $128.40.',
      screenshotUrl: '/mock/screenshots/flowers-cart.png',
      requestedAt: now,
      respondedAt: null
    }
  ],
  taskSteps: [
    { id: 'step_1', taskId: 'task_1003', stepNumber: 1, action: 'Opened 1-800-Flowers', screenshotUrl: '/mock/screenshots/001.png', createdAt: now },
    { id: 'step_2', taskId: 'task_1003', stepNumber: 2, action: 'Added red roses to cart', screenshotUrl: '/mock/screenshots/002.png', createdAt: now },
    { id: 'step_3', taskId: 'task_1003', stepNumber: 3, action: 'Paused before checkout', screenshotUrl: '/mock/screenshots/003.png', createdAt: now }
  ],
  calls: [
    {
      id: 'call_1001',
      taskId: 'task_1002',
      provider: 'VAPI',
      status: 'COMPLETED',
      objective: 'Schedule dental cleaning any morning next week',
      phoneNumber: '+14155550144',
      durationSeconds: 246,
      transcriptUrl: '/mock/transcripts/call_1001.txt',
      summary: 'Redwood Dental confirmed Tuesday at 10:30am.',
      createdAt: now
    }
  ],
  credentials: [
    { id: 'cred_1', userId: 'user_demo', provider: 'Amazon', secretReference: 'secret/taskpilot/amazon', status: 'CONNECTED' },
    { id: 'cred_2', userId: 'user_demo', provider: 'DoorDash', secretReference: 'secret/taskpilot/doordash', status: 'CONNECTED' }
  ],
  auditLogs: [
    { id: 'audit_1', userId: 'user_demo', taskId: 'task_1003', action: 'APPROVAL_REQUESTED', metadata: { total: 128.4 }, createdAt: now }
  ],
  subscriptions: [
    { id: 'sub_demo', userId: 'user_demo', plan: 'EXECUTIVE', stripeSubscriptionId: 'sub_mock', status: 'ACTIVE' }
  ]
};

function ensureDatabase() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(seed, null, 2));
  }
}

function loadDatabase() {
  ensureDatabase();
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    const recoveryFile = path.join(dataDir, `taskpilot.corrupt.${Date.now()}.json`);
    fs.copyFileSync(dataFile, recoveryFile);
    fs.writeFileSync(dataFile, JSON.stringify(seed, null, 2));
    return JSON.parse(JSON.stringify(seed));
  }
}

export const db = loadDatabase();

export function saveDb() {
  ensureDatabase();
  fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
}
