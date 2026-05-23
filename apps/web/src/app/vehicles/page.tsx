import { fetchVehicles } from "@/api/fetch-vehicles";

import { VehicleListing } from "./_vehicle-listing/vehicle-listing";
import { FilterPanel } from "./_filter-panel/filter-panel";

export default async function Vehicles() {
  const vehicles = await fetchVehicles();

  return (
    <div className="grid grid-cols-[minmax(300px,max-content)_1fr]">
      {/* <FilterPanel /> */}
      <VehicleListing vehicles={vehicles} />
    </div>
  );
}
