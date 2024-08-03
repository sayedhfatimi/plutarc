'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { db } from '../db';
import { accounts, users } from '../db/schema';

export default async function deleteAccount() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    await db.delete(accounts).where(eq(accounts.userId, session.user.id));

    await db.delete(users).where(eq(users.id, session.user.id));

    revalidatePath('/');
  } catch (error) {
    return { error };
  }

  redirect('/sign-out');
}
