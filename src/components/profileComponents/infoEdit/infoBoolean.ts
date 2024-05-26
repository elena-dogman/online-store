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
export function fillObjectWithUniqueKeys(form: HTMLFormElement): {
  [key: string]: boolean;
} {
  const formArray = Array.from(form.elements).filter(
    (element) =>
      element.tagName === 'INPUT' &&
      element.getAttribute('type') !== 'checkbox',
  ) as HTMLInputElement[];
  const obj: { [key: string]: boolean } = {};
  let counter: number = 1;

  formArray.forEach((_, index) => {
    let key: string = index.toString();

    while (Object.prototype.hasOwnProperty.call(obj, key)) {
      counter++;
      key = index.toString() + counter;
    }

    obj[key] = true;
    counter = 1; // Reset counter for the next element
  });

  if (Object.keys(obj).length !== formArray.length) {
    while (Object.keys(obj).length > formArray.length) {
      delete obj[Object.keys(obj).pop()!];
    }
    while (Object.keys(obj).length < formArray.length) {
      obj[Object.keys(obj).length.toString()] = true;
    }
  }
  profileBoolValidation = obj;
  return obj;
}
