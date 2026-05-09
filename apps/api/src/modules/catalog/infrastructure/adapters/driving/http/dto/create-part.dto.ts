import { z } from 'zod';
import { PartCategory } from '../../../../../domain/enums/part-category.enum';

const currentYear = new Date().getFullYear();

const CompatibilitySchema = z
  .object({
    make: z.string().min(1),
    model: z.string().min(1),
    yearFrom: z.number().int().min(1900),
    yearTo: z
      .number()
      .int()
      .max(currentYear + 1),
  })
  .refine((c) => c.yearFrom <= c.yearTo, {
    message: 'yearFrom cannot be after yearTo',
  });

export const CreatePartSchema = z.object({
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
  partCategory: z.enum(PartCategory, {
    error: () => ({
      message: `Must be one of: ${Object.values(PartCategory).join(', ')}`,
    }),
  }),
  compatibilities: z
    .array(CompatibilitySchema)
    .min(1, 'At least one compatibility is required'),
  oemPartNumber: z.string().min(1).optional(),
});

export type CreatePartDto = z.infer<typeof CreatePartSchema>;
