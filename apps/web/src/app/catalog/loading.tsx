import { MotorcycleCardSkeleton } from "./_components/motorcycle-card-skeleton";

export default function CatalogLoading() {
  const items = new Array(6).fill(null).map((_, index) => index);

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <MotorcycleCardSkeleton key={item} />
      ))}
    </div>
  );
}
