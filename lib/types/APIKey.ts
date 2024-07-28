import type { InferSelectModel } from 'drizzle-orm';
import type { APIKey } from '../db/schema';

export type TAPIKey = InferSelectModel<typeof APIKey>;
