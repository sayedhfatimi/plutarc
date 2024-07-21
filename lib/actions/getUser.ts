'use server';
import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { db } from '../db';
import { users } from '../db/schema';

export default async function getUser() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    return { user };
  } catch (error) {
    return { error: error };
  }
}
