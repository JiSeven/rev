import type { Vehicle } from "@/api/types";

import { client } from "./_client";

export async function fetchVehicles() {
  const path = "/vehicles";

  return await client<Vehicle[]>(path, {
    next: {
      tags: ["vehicles"],
    },
  });
}
