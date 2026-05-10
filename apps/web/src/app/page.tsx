import { getMotorcycles } from "@/lib/motorcycles/get-motorcycles";

export default async function Home() {
  const motorcycles = await getMotorcycles();

  return (
    <div>Hey</div>
  );
}
