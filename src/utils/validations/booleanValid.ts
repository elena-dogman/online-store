import { authFormButton } from '../../components/registrationForm/registrationForm';

export const validStatus = {
  name: false,
  lastName: false,
  password: false,
  mail: false,
  date: false,
  postBilling: false,
  cityBilling: false,
  streetBilling: false,
  postShipping: false,
  cityShipping: false,
  streetShipping: false,
};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}
export function checkAllInputs(): void {
  if (Object.values(validStatus).every((value) => value)) {
    console.log(validStatus);
    authFormButton.removeAttribute('disabled');
  } else {
    console.log(validStatus);
    authFormButton.setAttribute('disabled', '');
  }
}
