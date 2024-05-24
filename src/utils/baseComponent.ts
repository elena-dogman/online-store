export type EventCallback = {
  eventType: keyof HTMLElementEventMap;
  callback: (event: Event) => void;
};
export interface ElementParams<TTag extends keyof HTMLElementTagNameMap> {
  tag: TTag;
  classNames?: string[];
  textContent?: string;
  attributes?: { [key: string]: string };
  callbacks?: EventCallback[];
}

function setCallbacks(
  element: HTMLElement,
  callbacks: Array<EventCallback>,
): void {
  callbacks.forEach(({ eventType, callback }) => {
    element.addEventListener(eventType, callback);
  });
}

export function createElement(
  params: ElementParams<keyof HTMLElementTagNameMap>,
): HTMLElement {
  const element = document.createElement(params.tag);

  if (params.classNames) {
    params.classNames.forEach((cssClass) => element.classList.add(cssClass));
  }

  if (params.textContent) {
    element.textContent = params.textContent;
  }

  if (params.attributes) {
    Object.keys(params.attributes).forEach((attrName) => {
      if (params.attributes) {
        element.setAttribute(attrName, params.attributes[attrName]);
      }
    });
  }

  if (params.callbacks) {
    setCallbacks(element, params.callbacks);
  }

  return element;
}

export function addInnerComponent(
  parent: HTMLElement,
  child: HTMLElement,
): void {
  parent.appendChild(child);
}

export function removeElement(element: HTMLElement): void {
  element.remove();
}

export function setAttribute(
  element: HTMLElement,
  name: string,
  value: string,
): HTMLElement {
  const newElement = element.cloneNode(true) as HTMLElement;
  newElement.setAttribute(name, value);
  return newElement;
}

export function addClass(element: HTMLElement, className: string): HTMLElement {
  const newElement = element.cloneNode(true) as HTMLElement;
  newElement.classList.add(className);
  return newElement;
}

export function removeClass(
  element: HTMLElement,
  className: string,
): HTMLElement {
  const newElement = element.cloneNode(true) as HTMLElement;
  newElement.classList.remove(className);
  return newElement;
}

export function clear(element: HTMLElement): void {
  element.innerHTML = '';
}

export function setDisabled(
  element: HTMLButtonElement,
  disabled: boolean,
): HTMLButtonElement {
  const newElement = element.cloneNode(true) as HTMLButtonElement;
  newElement.disabled = disabled;
  return newElement;
}

export function isEnabled(element: HTMLButtonElement): boolean {
  return !element.disabled;
}

export function getValue(element: HTMLInputElement): string {
  return element.value;
}

export function setValue(
  element: HTMLInputElement,
  value: string,
): HTMLInputElement {
  const newElement = element.cloneNode(true) as HTMLInputElement;
  newElement.value = value;
  return newElement;
}
