import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const createTaskSchema = z.object({
  body: z.object({
    prompt: z.string().min(8),
    source: z.enum(['dashboard', 'slack', 'sms']).default('dashboard'),
    attachments: z.array(z.string()).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: z.string().min(1) }),
  query: z.object({}).optional()
});

export const createCallSchema = z.object({
  body: z.object({
    objective: z.string().min(8),
    phoneNumber: z.string().optional(),
    provider: z.enum(['VAPI', 'RETELL', 'BLAND']).default('VAPI')
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});
