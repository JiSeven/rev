import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const CreateMotorcycleSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  make: z.string().min(1).max(100),
  model: z.string().min(1).max(100),
  year: z
    .number()
    .int()
    .min(1900)
    .max(currentYear + 1),
  price: z.object({
    amount: z.number().positive(),
    currency: z
      .string()
      .regex(/^[A-Z]{3}$/, 'Must be a 3-letter ISO 4217 code'),
  }),
  engineSpec: z.object({
    displacementCc: z.number().int().min(50).max(2500),
    cylinders: z.number().int().min(1).max(8),
    powerKw: z.number().positive(),
    torqueNm: z.number().positive(),
    configuration: z.string().min(1),
  }),
});

export type CreateMotorcycleDto = z.infer<typeof CreateMotorcycleSchema>;
