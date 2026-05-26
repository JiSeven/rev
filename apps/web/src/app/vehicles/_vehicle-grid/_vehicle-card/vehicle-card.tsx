import Image from "next/image";
import { Vehicle } from "@/api/types";

import { WalkingDistance } from "@/components/ui/walking-distance/walking-distance";

import "./vehicle-card.css";
import { Rating } from "@/components/ui/rating/rating";
import { VehicleFavoriteButton } from "@/components/vehicle-favorite-button/vehicle-favorite-button";
import { RentalPrice } from "./_rental-price/rental-price";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <section className="vehicle-card">
      <div className="header">
        <WalkingDistance />
        <Rating />

        <VehicleFavoriteButton />
      </div>

      <Image
        src="/vehicle-preview.png"
        width="388"
        height="171"
        unoptimized
        alt=""
      />

      <h3>{vehicle.model.brand.name}</h3>
      <div className="specs">{vehicle.model.name}</div>

      <RentalPrice />
    </section>
  );
}
