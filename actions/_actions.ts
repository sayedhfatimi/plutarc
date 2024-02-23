'use server';
import authOptions from '@/app/(auth)/authOptions';
import prisma from '@/prisma/client';
import { createAPISchema } from '@/schemas/createAPISchema';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addApiKey(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) return { errors: 'Not authorised for this action.' };

  const body = await data;

  const validation = createAPISchema.safeParse(body);

  if (!validation.success)
    return { errors: validation.error.flatten().fieldErrors };

  const { userId, label, exchange, apiKey, apiSecret } = body;

  try {
    await prisma.userAPICredentials.create({
      data: {
        userId,
        label,
        exchange,
        apiKey,
        apiSecret,
      },
    });
  } catch (error) {
    return { errors: error };
  }

  redirect('/settings/userApiCredentials');
}

export async function deleteApiKey(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { errors: 'Not authorised for this action.' };

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

export async function getApiKeys() {
  const session = await getServerSession(authOptions);
  if (!session) return { errors: 'Not authorised for this action.' };

  try {
    const apiKeys = await prisma.userAPICredentials.findMany({
      where: { userId: session!.user!.id },
    });

    if (!apiKeys || apiKeys.length === 0)
      return { errors: 'No API keys found.' };

    return apiKeys;
  } catch (error) {
    return { errors: error };
  }
}
