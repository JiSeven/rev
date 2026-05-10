import { Motorcycle } from "@/types/motorcycle";

const API_URL = process.env.API_URL;

export async function getMotorcycles(): Promise<Motorcycle[]> {
  const response = await fetch(`${API_URL}/catalog`, {
    next: {
      tags: ["motorcycles"],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch motorcycles: ${response.status}`);
  }

  return response.json();
}
