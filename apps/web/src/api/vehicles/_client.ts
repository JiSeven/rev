import { createApiClient } from "@/api/_lib/create-api-client";

export const client = createApiClient(process.env.API_URL as string, {});
