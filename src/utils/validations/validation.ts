import * as validationFunc from './validationsComponents';
interface ValidationMap {
  [key: string]: (input: string, error?: HTMLSpanElement | null) => void;
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

export function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const error = checkError(this.parentElement?.children);
  const attribute = this.getAttribute('data-validation-type');
  const validationMap: ValidationMap = {
    name: validationFunc.nameValidation,
    lastName: validationFunc.lastNameValidation,
    shippingPost: validationFunc.postCodeShippingValidation,
    shippingCity: validationFunc.cityShippingValidation,
    billingPost: validationFunc.postCodeBillingValidation,
    billingCity: validationFunc.cityBillingValidation,
    street: validationFunc.streetValidation,
    password: validationFunc.passwordValidation,
    email: validationFunc.mailValidation,
    birthday: validationFunc.validationBirth,
    day: validationFunc.dayValidation,
    month: validationFunc.monthValidation,
    year: validationFunc.yearValidation,
  };

  if (attribute && validationMap[attribute]) {
    validationMap[attribute](value, error);
  }

  return true;
}
