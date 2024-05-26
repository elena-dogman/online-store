export const infoReadvalidStatus = {
  name: true,
};

export function setInfoReadvalidStatus(
  field: keyof typeof infoReadvalidStatus,
  value: boolean,
): void {
  infoReadvalidStatus[field] = value;
}
export let profileBoolValidation = {};
export function fillObjectWithUniqueKeys(elements: HTMLInputElement[]): {
  [key: string]: boolean;
} {
  const obj: { [key: string]: boolean } = {};
  let counter: number = 1;

  elements.forEach((_, index) => {
    let key: string = index.toString();

    while (Object.prototype.hasOwnProperty.call(obj, key)) {
      counter++;
      key = index.toString() + counter;
    }

    obj[key] = true;
    counter = 1; // Reset counter for the next element
  });
  profileBoolValidation = obj;
  return obj;
}
