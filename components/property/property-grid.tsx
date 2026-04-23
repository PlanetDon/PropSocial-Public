import { PropertyCard } from "@/components/property/property-card";
import type { Property } from "@/types/property";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
