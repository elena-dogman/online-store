export const infoReadvalidStatus = {
  name: true,
};

export function setInfoReadvalidStatus(
  field: keyof typeof infoReadvalidStatus,
  value: boolean,
): void {
  infoReadvalidStatus[field] = value;
}
