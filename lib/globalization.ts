import { SUPPORTED_REGIONS } from "@/lib/constants";

export function getCurrencyByRegion(regionCode: string): string {
  return SUPPORTED_REGIONS.find((region) => region.code === regionCode)?.currency ?? "USD";
}

export function getLegalDisclaimer(regionCode: string): string {
  const map: Record<string, string> = {
    "NG-LA":
      "Investments are subject to SEC Nigeria and local property regulations. Verify all disclosures before committing funds.",
    "US-NY":
      "Investment opportunities are informational and may require accredited investor eligibility under US regulations.",
    "GB-LDN":
      "Property investments are subject to FCA guidance and UK anti-money laundering checks."
  };

  return map[regionCode] ?? "Regional legal and compliance checks apply before transaction completion.";
}
