import { z } from 'zod';

import { ModelSchema } from './model.schema';

export const VehicleSchema = z.object({
  id: z.cuid2(),
  model: ModelSchema,
});
