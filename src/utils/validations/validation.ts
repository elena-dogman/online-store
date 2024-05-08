import * as validationFunc from './validatinsComponents';
export function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const parent = this.parentNode;
  const attribute = this.getAttribute('data-validation-type');
  if (attribute === 'name') {
    validationFunc.nameValidation(value, parent);
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
  return true;
}
