import { InferSelectModel } from 'drizzle-orm';
import { apiKeys } from '../db/schema';

export type TAPIKeys = InferSelectModel<typeof apiKeys>;
