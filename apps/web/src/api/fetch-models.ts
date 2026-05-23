import type { Brand } from "@/api/types";

import { client } from "./_client";

export async function fetchModels() {
  return await client<Brand[]>("/vehicles/models", {
    next: {
      tags: ["models"],
    },
  });
}
