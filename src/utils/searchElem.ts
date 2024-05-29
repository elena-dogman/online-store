export function searchElement(
  addressParent: Element,
  searchElem: string,
): HTMLElement | undefined {
  const addressContainer = Array.from(addressParent?.children);
  let result: HTMLElement | undefined;
  addressContainer.forEach((e) => {
    if (e instanceof HTMLElement && e.classList.contains(searchElem)) {
      result = e;
    }
  });
  return result;
}
export function searchInput(
  addressParent: Element,
): HTMLInputElement | undefined {
  const addressContainer = Array.from(addressParent?.children);
  let result;
  addressContainer.forEach((e) => {
    if (e.tagName === 'INPUT') {
      result = e;
    }
  });
  return result;
}
