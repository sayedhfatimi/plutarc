'use server';
import authOptions from '@/app/(auth)/authOptions';
import prisma from '@/prisma/client';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createPassphrase(
  data: z.infer<typeof createPassphraseSchema>,
) {
  const session = await getServerSession(authOptions);
  if (!session) return { errors: 'Not authorized for this action.' };

  const { passphrase } = createPassphraseSchema.parse(data);

  await prisma.user.update({
    where: { id: session!.user!.id },
    data: { passphraseHash: passphrase },
  });

  revalidatePath('/dashboard', 'page');
  redirect('/dashboard');
}

export async function deleteApiKey(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { errors: 'Not authorized for this action.' };

  const apiKey = await prisma.userAPICredentials.findUnique({
    where: { id },
  });

  if (!apiKey) return { errors: 'Key does not exist.' };

  await prisma.userAPICredentials.delete({
    where: { id: apiKey.id },
  });

  revalidatePath('/settings/userApiCredentials', 'page');
  redirect('/settings/userApiCredentials');
}