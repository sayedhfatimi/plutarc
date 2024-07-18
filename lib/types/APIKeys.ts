import { InferSelectModel } from 'drizzle-orm';
import { apiKeys } from '../db/schema';

export type TapiKey = InferSelectModel<typeof apiKeys>;
