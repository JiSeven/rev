import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3002),
  DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
