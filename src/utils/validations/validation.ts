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

export function validateInput(event: Event): boolean {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value.trim();
  const error = checkError(inputElement.parentElement?.children);
  const attribute = inputElement.getAttribute('data-validation-type');
  const validationMap: ValidationMap = {
    name: validationFunc.nameValidation,
    lastName: validationFunc.lastNameValidation,
    shippingPost: validationFunc.postCodeShippingValidation,
    shippingCity: validationFunc.cityShippingValidation,
    billingPost: validationFunc.postCodeBillingValidation,
    billingCity: validationFunc.cityBillingValidation,
    billingStreet: validationFunc.streetBillingValidation,
    shippingStreet: validationFunc.streetShippingValidation,
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
