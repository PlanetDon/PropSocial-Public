import { Badge } from "@/components/ui/badge";
import type { EscrowRecord } from "@/types/grc";

export function EscrowStatusIndicator({ status }: { status: EscrowRecord["status"] }) {
  if (status === "held") return <Badge variant="warning">Escrow held</Badge>;
  if (status === "released") return <Badge variant="success">Escrow released</Badge>;
  if (status === "disputed") return <Badge variant="danger">Escrow disputed</Badge>;
  return <Badge variant="outline">Escrow initiated</Badge>;
}
