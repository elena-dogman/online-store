export const validStatus = {
  shippingIsDefault: false,
  billingIsDefault: false,
  oneAdress: false,
};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}
