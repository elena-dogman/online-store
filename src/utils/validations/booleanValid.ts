export const validStatus = {
  name: false,
  lastName: false,
  password: false,
  mail: false,
  date: false,
  post: false,
  city: false,
  street: false,
};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}
