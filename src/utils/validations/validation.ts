import * as validationFunc from './validationsComponents';
export function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const attribute = this.getAttribute('data-validation-type');

  const validationMap: Record<string, (input: string) => void> = {
    name: validationFunc.nameValidation,
    lastName: validationFunc.lastNameValidation,
    city: validationFunc.cityValidation,
    street: validationFunc.streetValidation,
    password: validationFunc.passwordValidation,
    email: validationFunc.mailValidation,
    birthday: validationFunc.validationBirth,
    day: validationFunc.dayValidation,
    month: validationFunc.monthValidation,
    year: validationFunc.yearValidation,
    post: validationFunc.postCodeValidation,
  };

  if (attribute && validationMap[attribute]) {
    validationMap[attribute](value);
  }

  return true;
}