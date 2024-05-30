import { filterArray } from '../filterElem';
import * as validationFunc from './validationsComponents';
interface ValidationMap {
  [key: string]: (
    input: string,
    error: HTMLSpanElement | null,
    indexOfInput?: number | null,
    form?: HTMLFormElement | null,
  ) => void;
}
export function checkError(
  childrens: HTMLCollectionOf<Element> | undefined,
): HTMLSpanElement | null {
  if (childrens) {
    const childrenArray = Array.from(childrens);
    for (const element of childrenArray) {
      if (element.classList.contains('error')) {
        return element as HTMLSpanElement;
      }
    }
  }
  return null;
}
export function checkInputIndex(event: Event | HTMLInputElement): number {
  if (event instanceof Event) {
    const elem = event.target as HTMLInputElement;
    const form = elem.form as HTMLFormElement;
    const formArray = Array.from(form.elements).filter(
      (element) =>
        element.tagName === 'INPUT' &&
        element.getAttribute('type') !== 'checkbox' &&
        element.getAttribute('hide') !== '',
    ) as HTMLInputElement[];
    const index = formArray.indexOf(elem);
    return index;
  } else {
    const form = event.form as HTMLFormElement;
    const formArray = filterArray(form);
    const index = formArray.indexOf(event);
    return index;
  }
}
export function validateInput(event: Event): boolean {
  const indexOfInput = checkInputIndex(event);
  const element = event.target as HTMLInputElement;
  const value = element.value.trim();
  const error = checkError(element.parentElement?.children);
  const form = element.form;
  const attribute = element.getAttribute('data-validation-type');
  const validationMap: ValidationMap = {
    name: validationFunc.nameValidation,
    lastName: validationFunc.lastNameValidation,
    city: validationFunc.cityValidation,
    post: validationFunc.postCodeValidation,
    street: validationFunc.streetValidation,
    password: validationFunc.passwordValidation,
    email: validationFunc.mailValidation,
    birthday: validationFunc.validationBirth,
    day: validationFunc.dayValidation,
    month: validationFunc.monthValidation,
    year: validationFunc.yearValidation,
  };
  if (attribute && validationMap[attribute]) {
    validationMap[attribute](value, error, indexOfInput, form);
  }
  return true;
}
