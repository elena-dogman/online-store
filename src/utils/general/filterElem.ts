export function filterArray(form: HTMLFormElement): HTMLInputElement[] {
  return Array.from(form.elements).filter(
    (element) =>
      element.tagName === 'INPUT' &&
      element.getAttribute('type') !== 'checkbox' &&
      element.getAttribute('hide') !== '',
  ) as HTMLInputElement[];
}
export function isEmptyArray(arr: HTMLInputElement[]): boolean {
  if (arr.length === 0) {
    return true;
  } else {
    return false;
  }
}
