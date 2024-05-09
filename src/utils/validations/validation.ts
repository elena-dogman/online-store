import * as validationFunc from './validationsComponents';
export function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const parent: HTMLLabelElement | null = this.parentNode as HTMLLabelElement;
  const attribute = this.getAttribute('data-validation-type');
  if (attribute === 'name') {
    validationFunc.nameValidation(value, parent);
  }
  if (attribute === 'lastName') {
    validationFunc.lastNameValidation(value, parent);
  }
  if (attribute === 'city') {
    validationFunc.cityValidation(value, parent);
  }
  if (attribute === 'street') {
    validationFunc.streetValidation(value, parent);
  }
  if (attribute === 'password') {
    validationFunc.passwordValidation(value, parent);
  }
  if (attribute === 'email') {
    validationFunc.mailValidation(value, parent);
  }
  if (attribute === 'birthday') {
    validationFunc.validationBirth(value, parent);
  }
  if (attribute === 'day') {
    validationFunc.dayValidation(value, parent);
  }
  if (attribute === 'month') {
    validationFunc.monthValidation(value, parent);
  }
  if (attribute === 'year') {
    validationFunc.yearValidation(value, parent);
  }
  if (attribute === 'post') {
    validationFunc.postCodeValidation(value, parent);
  }
  return true;
}
