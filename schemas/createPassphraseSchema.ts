import { z } from 'zod';

export const createPassphraseSchema = z
  .object({
    passphrase: z.string().min(18).max(255),
    confirmPassphrase: z.string().min(18).max(255),
  })
  .superRefine(({ confirmPassphrase, passphrase }, ctx) => {
    if (confirmPassphrase !== passphrase) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passphrase do not match.',
        path: ['confirmPassphrase'],
      });
    }
  });
