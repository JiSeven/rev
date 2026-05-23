import z from 'zod';

export const BrandSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
});
