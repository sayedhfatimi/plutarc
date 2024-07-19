'use server';
import { createApiKeySchema } from '@/schemas/createApiKeySchema';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from './auth';
import { db } from './db';
import { accounts, apiKeys, users } from './db/schema';

export async function getUser() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    return { user };
  } catch (error) {
    return { error: error };
  }
}

export async function createPassphrase(
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

export async function resetPassphrase() {
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

export async function deleteAccount() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    await db.delete(apiKeys).where(eq(apiKeys.userId, session.user.id));

    await db.delete(accounts).where(eq(accounts.userId, session.user.id));

    await db.delete(users).where(eq(users.id, session.user.id));

    revalidatePath('/');
  } catch (error) {
    return { error };
  }
  redirect('/sign-out');
}

export async function getApiKeys() {
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

export async function createApiKey(data: z.infer<typeof createApiKeySchema>) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  if (!data) return { error: 'No data received.' };

  const validation = createApiKeySchema.safeParse(data);
  if (!validation.success) return { error: validation.error.errors };

  const { label, apiKey, apiSecret, exchange } = data;

  try {
    const res = await db
      .insert(apiKeys)
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

export async function deleteApiKey(id: string) {
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
