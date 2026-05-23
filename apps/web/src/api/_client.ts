import { createApiClient } from "@/lib/create-api-client";

import { UnknownVehicleException } from "./_exceptions";

export const client = createApiClient(process.env.API_URL as string, {
  unknown: UnknownVehicleException,
});
