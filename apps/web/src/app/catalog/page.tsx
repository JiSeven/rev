import { getMotorcycles } from "@/lib/motorcycles/get-motorcycles";
import { MotorcycleCard } from "./_components/motorcycle-card";

export default async function Catalog() {
  const motorcycles = await getMotorcycles();

  return (
    <div className="grid grid-cols-4 gap-4">
      {motorcycles.map((motorcycle) => (
        <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
      ))}
    </div>
  );
}
