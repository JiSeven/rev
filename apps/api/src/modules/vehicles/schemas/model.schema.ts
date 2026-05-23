import z from 'zod';

import { BrandSchema } from './brand.schema';

export const ModelSchema = z.object({
  id: z.cuid2(),
  name: z.string(),

  brand: BrandSchema,
});
