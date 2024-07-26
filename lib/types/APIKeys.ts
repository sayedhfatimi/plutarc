import type { InferSelectModel } from 'drizzle-orm';
import type { apiKeys } from '../db/schema';

export type TAPIKeys = InferSelectModel<typeof apiKeys>;
