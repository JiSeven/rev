import { fetchBrands } from "@/api/fetch-brands";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export async function BrandsInput() {
  const brands = await fetchBrands();

  return (
    <FieldSet className="p-3">
      <Label className="uppercase">Brands</Label>

      <FieldGroup>
        {brands.map((brand) => (
          <Field key={brand.id} orientation="horizontal">
            <Checkbox id={brand.id} />
            <FieldLabel htmlFor={brand.id}>{brand.name}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
