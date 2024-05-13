export const validStatus = {
  name: false,
  lastName: false,
  password: false,
  mail: false,
  date: false,
  postBilling: false,
  cityBilling: false,
  streetBilling: false,
  postShipping: false,
  cityShipping: false,
  streetShipping: false,
};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}
