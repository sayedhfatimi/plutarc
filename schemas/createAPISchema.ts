import { z } from "zod";

export const createAPISchema = z.object({
  exchange: z.string().min(1, "An option must be selected.").max(255),
  apiKey: z.string().min(1, "API Client ID is required.").max(255),
  apiSecret: z.string().min(1, "API Client Secret is required.").max(255),
});
