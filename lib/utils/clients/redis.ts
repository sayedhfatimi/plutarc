import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_REST_URL,
  token: process.env.NEXT_PUBLIC_REDIS_REST_TOKEN,
});

export default redis;
