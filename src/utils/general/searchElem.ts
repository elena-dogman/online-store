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
export function findElement(
  element: Element,
  searchElem: string,
  getAllMatches: boolean = false,
): HTMLElement | HTMLElement[] | undefined {
  const matches: HTMLElement[] = [];

  if (element.classList.contains(searchElem)) {
    if (getAllMatches) {
      matches.push(element as HTMLElement);
    } else {
      return element as HTMLElement;
    }
  }

  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const result = findElement(children[i], searchElem, getAllMatches);
    if (result) {
      if (Array.isArray(result)) {
        matches.push(...result);
      } else {
        if (getAllMatches) {
          matches.push(result);
        } else {
          return result;
        }
      }
    }
  }

  if (matches.length > 0) {
    return matches;
  }

  return;
}
export function getCountriesList(elements: HTMLInputElement[]): HTMLElement[] {
  return elements
    .map((element) => {
      const parent = element.parentElement;
      if (parent && parent.parentElement) {
        return parent.parentElement;
      } else {
        return null;
      }
    })
    .filter((parent): parent is HTMLElement => parent !== null)
    .flatMap((elem) => {
      const wrapper = searchElement(elem, 'country-wrapper');
      return wrapper ? [wrapper] : [];
    })
    .flatMap((elem) => {
      const wrapper = searchElement(elem, 'countries-list');
      return wrapper ? [wrapper] : [];
    })
    .filter((elem): elem is HTMLElement => elem !== undefined);
}
