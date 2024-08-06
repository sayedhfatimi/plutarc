'use server';
import type { StorageValue } from 'zustand/middleware';
import type { TVaultState } from '../types/terminal/TVaultState';
import redis from '../utils/clients/redis';
import type { DeepPartial } from '../vault';

export default async function setVaultState(
  name: string,
  value: StorageValue<DeepPartial<TVaultState>>,
): Promise<void> {
  await redis.json.set(name, '$', value);
}
