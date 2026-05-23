import { Vehicle } from "@/api/types";

import { VehicleCard } from "./_vehicle-card/vehicle-card";
import { Header } from "./_header/header";

type Props = {
  vehicles: Vehicle[];
};

export function VehicleListing({ vehicles }: Props) {
  return (
    <section>
      <Header vehiclesCount={vehicles.length} />

      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
