import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Motorcycle } from "@/types/motorcycle";

type Props = {
  motorcycle: Motorcycle;
};

export function MotorcycleCard({ motorcycle }: Props) {
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{motorcycle.name}</CardTitle>
        <CardDescription>{motorcycle.model}</CardDescription>
      </CardHeader>

      <CardContent>{motorcycle.make}</CardContent>
    </Card>
  );
}
