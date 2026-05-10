import { Motorcycle } from "@/types/motorcycle";

const API_URL = process.env.API_URL;

export async function getMotorcycle(id: string): Promise<Motorcycle | null> {
  const response = await fetch(`${API_URL}/motorcycles/${id}`, {
    next: {
      tags: ["motorcycles", `motorcycle-${id}`],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch motorcycle ${id}: ${response.status}`);
  }

  return response.json();
}
