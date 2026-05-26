import { VehicleCard } from "./_vehicle-card/vehicle-card";

import "./vehicle-grid.css";
import { fetchVehicles } from "@/api/vehicles/fetch-vehicles";

export async function VehicleGrid() {
  const vehicles = await fetchVehicles();

  return (
    <div className="vehicle-grid">
      <div className="content">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
