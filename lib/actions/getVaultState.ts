'use server';
import type { StorageValue } from 'zustand/middleware';
import type { TVaultState } from '../types/terminal/TVaultState';
import redis from '../utils/clients/redis';
import type { DeepPartial } from '../vault';

export default async function getVaultState(
  name: string,
): Promise<StorageValue<DeepPartial<TVaultState>> | null> {
  const res =
    await redis.json.get<StorageValue<DeepPartial<TVaultState>>>(name);

  if (!res) return null;

  return res;
}
