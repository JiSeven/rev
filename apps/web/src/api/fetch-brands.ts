import type { Brand } from "@/api/types";

import { client } from "./_client";

export async function fetchBrands() {
  return await client<Brand[]>("/vehicles/brands", {
    next: {
      tags: ["brands"],
    },
  });
}
