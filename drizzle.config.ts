import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    ssl: {
      rejectUnauthorized: false,
    },
    // biome-ignore lint/style/noNonNullAssertion: .env variable
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
