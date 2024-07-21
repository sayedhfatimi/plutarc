'use server';
import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { db } from '../db';
import { apiKeys } from '../db/schema';

export default async function getApiKeys() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const apiKeyArr = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.userId, session.user.id));

    return { apiKeyArr };
  } catch (error) {
    return { error };
  }
}
