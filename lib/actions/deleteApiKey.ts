'use server';
import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { db } from '../db';
import { APIKey } from '../db/schema';

export default async function deleteApiKey(id: string) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  const res = await db.select().from(APIKey).where(eq(APIKey.id, id));

  if (!APIKey) return { error: 'Key does not exist.' };

  try {
    await db.delete(APIKey).where(eq(APIKey.id, res[0].id));
  } catch (error) {
    return { error: error };
  }
}
