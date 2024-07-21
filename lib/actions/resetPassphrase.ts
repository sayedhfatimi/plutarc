'use server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { db } from '../db';
import { apiKeys, users } from '../db/schema';

export default async function resetPassphrase() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    await db
      .update(users)
      .set({ passphraseHash: null })
      .where(eq(users.id, session.user.id));

    await db.delete(apiKeys).where(eq(apiKeys.userId, session.user.id));
  } catch (error) {
    return { error };
  }

  redirect('/sign-out');
}
