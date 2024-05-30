export const validStatusAddress = {
  shippingIsDefault: false,
  billingIsDefault: false,
  joinAddress: false,
};

export function setValidStatusAddress(
  field: keyof typeof validStatusAddress,
  value: boolean,
): void {
  validStatusAddress[field] = value;
}
