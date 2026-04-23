import { apiClient } from "@/lib/api";

export interface EscrowPaymentRequest {
  propertyId: string;
  amount: number;
  currency: string;
}

export interface EscrowPaymentResponse {
  transactionId: string;
  escrowStatus: "initiated" | "held" | "released";
}

export async function createEscrowPayment(
  payload: EscrowPaymentRequest
): Promise<EscrowPaymentResponse> {
  return apiClient<EscrowPaymentResponse>("/payments/escrow", {
    method: "POST",
    body: JSON.stringify(payload),
    authRequired: true
  });
}
