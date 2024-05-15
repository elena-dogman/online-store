import * as validationFunc from './validationsComponents';
interface ValidationMap {
  [key: string]: (
    input: string,
    error: HTMLSpanElement | null,
    type?: string | null,
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

export function validateInput(event: Event): boolean {
  const element = event.target as HTMLInputElement;
  const value = element.value.trim();
  const error = checkError(element.parentElement?.children);
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
    validationMap[attribute](value, error, type);
  }
  return true;
}
