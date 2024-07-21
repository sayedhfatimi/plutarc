'use server';
import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { db } from '../db';
import { apiKeys } from '../db/schema';

export default async function deleteApiKey(id: string) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  const apiKey = await db.select().from(apiKeys).where(eq(apiKeys.id, id));

  if (!apiKey) return { error: 'Key does not exist.' };

  try {
    await db.delete(apiKeys).where(eq(apiKeys.id, apiKey[0].id));
  } catch (error) {
    return { error: error };
  }
}
