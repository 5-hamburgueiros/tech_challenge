export interface PaymentsMercadoPagoResponseDto {
  "id": number,
  "date_created": string,
  "date_approved": string,
  "date_last_updated": string,
  "money_release_date": string,
  "payment_method_id": string,
  "payment_type_id": string,
  "status": PaymentsStatusMercadoPagoResponseDto,
  "status_detail": string,
  "description": string,
  "external_reference": string,
}

export enum PaymentsStatusMercadoPagoResponseDto {
  PENDING = "pending",
  APPROVED = "approved",
  AUTHORIZED = "authorized",
  IN_PROCESS = "in_process",
  IN_MEDIATION = "in_mediation",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  CHARGED_BACK = "charged_back",
}