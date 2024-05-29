export function filterArray(form: HTMLFormElement): HTMLInputElement[] {
  return Array.from(form.elements).filter(
    (element) =>
      element.tagName === 'INPUT' &&
      element.getAttribute('type') !== 'checkbox' &&
      element.getAttribute('hide') !== '',
  ) as HTMLInputElement[];
}
