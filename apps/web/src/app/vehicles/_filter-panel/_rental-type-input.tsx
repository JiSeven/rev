import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const rentalTypes = ["any", "per-day", "per-hour"];

export function RentalTypeInput() {
  return (
    <Field className="p-3">
      <FieldLabel className="uppercase">rental type</FieldLabel>
      <ToggleGroup variant="outline" type="single">
        {rentalTypes.map((rentalType) => (
          <ToggleGroupItem
            key={rentalType}
            value={rentalType}
            className="capitalize"
          >
            {rentalType.replace("-", " ")}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}
