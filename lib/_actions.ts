'use server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createPassphrase(
  data: z.infer<typeof createPassphraseSchema>,
) {
  const session = await auth();
  if (!session) return { errors: 'Not authorized for this action.' };

  const { passphrase } = createPassphraseSchema.parse(data);

  try {
    await prisma.user.update({
      where: { id: session!.user!.id },
      data: { passphraseHash: passphrase },
    });

    revalidatePath('/auth/dashboard', 'page');
  } catch (error) {
    return { error: error };
  }
  redirect('/auth/dashboard');
}

export async function deleteApiKey(id: string) {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  const apiKey = await prisma.userAPICredentials.findUnique({
    where: { id },
  });

  if (!apiKey) return { error: 'Key does not exist.' };

  try {
    await prisma.userAPICredentials.delete({
      where: { id: apiKey.id },
    });

    revalidatePath('/auth/settings/userApiCredentials', 'page');
  } catch (error) {
    return { error: error };
  }

  redirect('/auth/settings/userApiCredentials');
}

export async function getApiKeys() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const apiKeys = await prisma.userAPICredentials.findMany({
      where: { userId: session.user.id },
    });

    return { apiKeys };
  } catch (error) {
    return { error: error };
  }
}

export async function getUserObj() {
  const session = await auth();
  if (!session) return { error: 'Not authorized for this action.' };

  try {
    const userObj = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return { userObj };
  } catch (error) {
    return { error: error };
  }
}
