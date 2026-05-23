import { BrandsInput } from "./_brands-input";
import { ModelsInput } from "./_models-input";
import { RentalTypeInput } from "./_rental-type-input";
import { ShowAvailableSwitch } from "./_show-available-switch";

export async function FilterPanel() {
  return (
    <section>
      <h3>Filter by</h3>

      <RentalTypeInput />
      <ShowAvailableSwitch />
      <BrandsInput />
      <ModelsInput />
    </section>
  );
}
