'use server';
import redis from '../utils/clients/redis';

export default async function deleteVaultState(name: string): Promise<void> {
  await redis.json.del(name, '$');
}
