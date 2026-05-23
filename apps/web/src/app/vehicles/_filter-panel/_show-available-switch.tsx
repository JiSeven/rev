import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ShowAvailableSwitch() {
  return (
    <Field className="p-3 justify-between" orientation="horizontal">
      <Label htmlFor="show-available" className="uppercase">
        Available now only
      </Label>
      <Switch id="show-available" />
    </Field>
  );
}
