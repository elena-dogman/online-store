import * as validationFunc from './validationsComponents';
interface ValidationMap {
  [key: string]: (
    input: string,
    error: HTMLSpanElement | null,
    type?: string | null,
    button?: HTMLButtonElement | null,
  ) => void;
}
function checkError(
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
function checkButton(
  form: HTMLFormElement | null,
): HTMLButtonElement | undefined {
  if (form) {
    const button = Array.from(form.elements).filter((element) => {
      return element instanceof HTMLButtonElement;
    }) as HTMLButtonElement[];
    return button[0];
  }
}
export function validateInput(event: Event): boolean {
  const element = event.target as HTMLInputElement;
  const value = element.value.trim();
  const error = checkError(element.parentElement?.children);
  const form = element.form;
  const button = checkButton(form);
  const attribute = element.getAttribute('data-validation-type');
  const type = element.getAttribute('validation-element');
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
    validationMap[attribute](value, error, type, button);
  }
  return true;
}
