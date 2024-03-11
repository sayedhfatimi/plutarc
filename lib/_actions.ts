'use server';
import { auth } from '@/lib/auth/auth';
import prisma from '@/lib/prisma';
import { createAPISchema } from '@/schemas/createAPISchema';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function getUser() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

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

  const { passphrase } = createPassphraseSchema.parse(data);

  try {
    await prisma.user.update({
      where: { id: session!.user!.id },
      data: { passphraseHash: passphrase },
    });

    revalidatePath('/auth/settings/user-api-keys', 'page');
  } catch (error) {
    return { error };
  }
  redirect('/auth/settings/user-api-keys');
}

export async function resetPassphrase() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    await prisma.user.update({
      where: { id: session!.user!.id },
      data: { passphraseHash: null },
    });

    await prisma.userAPIKeys.deleteMany({
      where: { userId: session.user.id },
    });
  } catch (error) {
    return { error };
  }
  redirect('/sign-out');
}

export async function deleteAccount() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    await prisma.userAPIKeys.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.account.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.user.delete({
      where: { id: session.user.id },
    });
    revalidatePath('/');
  } catch (error) {
    return { error };
  }
  redirect('/sign-out');
}

export async function createApiKey(data: z.infer<typeof createAPISchema>) {
  const session = await auth(); // check session exists
  if (!session) return { error: 'Not authorized for this action.' };

  if (!data) return { error: 'No data received.' }; // check data was sent

  const validation = createAPISchema.safeParse(data); // parse data with zod
  if (!validation.success) return { error: validation.error.errors }; // return error if zod parse fails

  const { label, apiKey, apiSecret, exchange } = data; // destructure data

  try {
    // input data into db await response
    const res = await prisma.userAPIKeys.create({
      data: {
        userId: session.user.id,
        label,
        apiKey,
        apiSecret,
        exchange,
      },
    });

    return { res }; // return db response
  } catch (error) {
    return { error };
  }
}

export async function deleteApiKey(id: string) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  const apiKey = await prisma.userAPIKeys.findUnique({
    where: { id },
  });

  if (!apiKey) return { error: 'Key does not exist.' };

  try {
    await prisma.userAPIKeys.delete({
      where: { id: apiKey.id },
    });

    revalidatePath('/auth/settings/user-api-keys', 'page');
  } catch (error) {
    return { error: error };
  }

  redirect('/auth/settings/user-api-keys');
}

export async function getApiKeys() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const apiKeys = await prisma.userAPIKeys.findMany({
      where: { userId: session.user.id },
    });

    return { apiKeys };
  } catch (error) {
    return { error };
  }
}

// TODO: this was for testing purposes, implement using websockets
export async function getBitMexTickers() {
  try {
    const res = await fetch('https://www.bitmex.com/api/v1/instrument/active');

    return res.json();
  } catch (error) {}
}
