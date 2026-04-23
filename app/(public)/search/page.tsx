"use client";

import { useMemo } from "react";
import { LocationTracker } from "@/components/location/LocationTracker";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProperties } from "@/lib/mock-data";
import { usePropertyStore } from "@/store/property-store";

export default function SearchPage() {
  const { filters, setFilters, resetFilters } = usePropertyStore();

  const filtered = useMemo(() => {
    return mockProperties.filter((property) => {
      const byQuery =
        !filters.query ||
        property.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.query.toLowerCase());
      const byLocation =
        !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());
      const byVerification = !filters.verifiedOnly || property.compliance.verifiedOwnership;
      return byQuery && byLocation && byVerification;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Search and discovery</h1>
        <p className="text-sm text-slate-600">
          Filter by location, budget and trust status to reduce investment risk.
        </p>
      </header>

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4">
        <Input
          placeholder="Search properties"
          value={filters.query}
          onChange={(event) => setFilters({ query: event.target.value })}
        />
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(event) => setFilters({ location: event.target.value })}
        />
        <label className="flex items-center gap-2 rounded-md border border-slate-300 px-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(event) => setFilters({ verifiedOnly: event.target.checked })}
          />
          Verified only
        </label>
        <Button variant="secondary" onClick={resetFilters}>
          Reset filters
        </Button>
      </section>

      <LocationTracker />

      <PropertyGrid properties={filtered} />
    </div>
  );
}
