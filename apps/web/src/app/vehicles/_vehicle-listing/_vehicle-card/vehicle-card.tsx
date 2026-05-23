import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@/api/types";

import { VehiclePreview } from "./_vehicle-preview";
import { VehicleRentPrice } from "./_vehicle-rent-price";
import { DistanceToVehicle } from "./_distance-to-vehicle";
import { VehicleRating } from "./_vehicle-rating";
import { VehicleDescription } from "./_vehicle-info";
import { VehicleFavoriteToggle } from "./_vehicle-favorite-toggle";

type Props = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle: vehicle }: Props) {
  return (
    <Card size="sm" className="mx-auto w-full">
      <CardHeader className="grid grid-cols-[auto_auto_1fr] gap-3">
        <DistanceToVehicle />
        <VehicleRating />
        <VehicleFavoriteToggle className="ml-auto" />
      </CardHeader>

      <CardContent>
        <VehiclePreview image={vehicle.image} />
        <div className="grid grid-cols-[1fr_auto]">
          <CardTitle>
            <h3 className="font-bold">
              {vehicle.model.brand.name} {vehicle.model.name}
            </h3>
          </CardTitle>
          <VehicleRentPrice className="row-span-2 self-end ml-auto" />
          <CardDescription>
            <VehicleDescription description={vehicle.description} />
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
