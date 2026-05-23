import { fetchModels } from "@/api/fetch-models";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export async function ModelsInput() {
  const models = await fetchModels();

  return (
    <FieldSet className="p-3">
      <Label className="uppercase">Models</Label>

      <FieldGroup>
        {models.map((model) => (
          <Field key={model.id} orientation="horizontal">
            <Checkbox id={model.id} />
            <FieldLabel htmlFor={model.id}>{model.name}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
