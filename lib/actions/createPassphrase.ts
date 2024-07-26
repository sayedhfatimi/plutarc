'use server';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { auth } from '../auth';
import { db } from '../db';
import { users } from '../db/schema';

export default async function createPassphrase(
  data: z.infer<typeof createPassphraseSchema>,
) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  if (!data || data === null || data === undefined)
    return { error: 'No data received.' };

  const validation = createPassphraseSchema.safeParse(data);

  if (!validation.success) return { error: validation.error.errors };

  const { passphrase } = data;

  try {
    await db
      .update(users)
      .set({ passphraseHash: passphrase })
      .where(eq(users.id, session.user.id));
  } catch (error) {
    return { error };
  }
}
