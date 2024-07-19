import { z } from 'zod';

export const getPassphraseSchema = z.object({
  passphrase: z.string().min(18).max(255),
});
