import * as validationFunc from './validationsComponents';
export function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const attribute = this.getAttribute('data-validation-type');
  if (attribute === 'name') {
    validationFunc.nameValidation(value);
  }
  if (attribute === 'lastName') {
    validationFunc.lastNameValidation(value);
  }
  if (attribute === 'city') {
    validationFunc.cityValidation(value);
  }
  if (attribute === 'street') {
    validationFunc.streetValidation(value);
  }
  if (attribute === 'password') {
    validationFunc.passwordValidation(value);
  }
  if (attribute === 'email') {
    validationFunc.mailValidation(value);
  }
  if (attribute === 'birthday') {
    validationFunc.validationBirth(value);
  }
  if (attribute === 'day') {
    validationFunc.dayValidation(value);
  }
  if (attribute === 'month') {
    validationFunc.monthValidation(value);
  }
  if (attribute === 'year') {
    validationFunc.yearValidation(value);
  }
  if (attribute === 'post') {
    validationFunc.postCodeValidation(value);
  }
  return true;
}
