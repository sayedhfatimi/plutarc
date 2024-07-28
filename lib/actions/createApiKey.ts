'use server';
import { createApiKeySchema } from '@/schemas/createApiKeySchema';
import type { z } from 'zod';
import { auth } from '../auth';
import { db } from '../db';
import { APIKey } from '../db/schema';

export default async function createApiKey(
  data: z.infer<typeof createApiKeySchema>,
) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  if (!data) return { error: 'No data received.' };

  const validation = createApiKeySchema.safeParse(data);
  if (!validation.success) return { error: validation.error.errors };

  const { label, apiKey, apiSecret, exchange } = data;

  try {
    const [res] = await db
      .insert(APIKey)
      .values({
        userId: session.user.id,
        label,
        apiKey,
        apiSecret,
        exchange,
      })
      .returning();

    return { res };
  } catch (error) {
    return { error };
  }
}
