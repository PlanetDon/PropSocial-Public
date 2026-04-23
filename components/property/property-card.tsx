import Image from "next/image";
import Link from "next/link";
import { Heart, Wallet } from "lucide-react";
import { TrustBadge } from "@/components/grc/trust-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-48 w-full">
        <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
      </div>
      <CardContent className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-slate-900">{formatCurrency(property.price)}</p>
          <Link href={`/property/${property.id}`} className="block font-medium text-slate-800 hover:underline">
            {property.title}
          </Link>
          <p className="text-sm text-slate-600">{property.location}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {property.compliance.verifiedOwnership && <TrustBadge type="verified" />}
          {property.compliance.escrowProtected && <TrustBadge type="escrow" />}
          <TrustBadge type="risk" riskLevel={property.compliance.riskLevel} />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{property.rating.toFixed(1)} rating</span>
          <span>{property.reviewCount} reviews</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" className="gap-2">
            <Heart className="size-4" />
            Save
          </Button>
          <Button className="gap-2" disabled={!property.investmentEnabled}>
            <Wallet className="size-4" />
            Invest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
