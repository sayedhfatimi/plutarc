import { Exchange } from '@prisma/client';
import { z } from 'zod';

export const createAPISchema = z.object({
  label: z.string().min(1, 'You must provide a label for this key.').max(255),
  passphrase: z.string().min(18).max(32).optional(),
  exchange: z.nativeEnum(Exchange),
  apiKey: z.string().min(1, 'API Client ID is required.').max(255).trim(),
  apiSecret: z
    .string()
    .min(1, 'API Client Secret is required.')
    .max(255)
    .trim(),
});
