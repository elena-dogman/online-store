import * as booleanValid from './booleanValid';
import * as regFormComponents from '../../components/registrationForm/registrationForm';
import * as shippingComponents from '../../components/registrationForm/address/shipping';
import * as billingComponents from '../../components/registrationForm/address/billing';
export function submitRegData(): void {
  const name = regFormComponents.regFormInputName as HTMLInputElement;
  const lastName = regFormComponents.regFormInputLastName as HTMLInputElement;
  const password = regFormComponents.regFormInputPassword as HTMLInputElement;
  const mail = regFormComponents.regFormInputMail as HTMLInputElement;
  const postShipping = shippingComponents.shippingInputPost as HTMLInputElement;
  const postBilling = billingComponents.billingInputPost as HTMLInputElement;
  const cityBilling = billingComponents.billingInputCity as HTMLInputElement;
  const cityShipping = shippingComponents.shippingInputCity as HTMLInputElement;
  const streetShipping =
    shippingComponents.shippingInputStreet as HTMLInputElement;
  const streetBilling =
    billingComponents.billingInputStreet as HTMLInputElement;
  const countryShipping =
    shippingComponents.shippingInputCountry as HTMLInputElement;
  const countryBilling =
    billingComponents.billingInputCountry as HTMLInputElement;
  const birthDay = regFormComponents.birthDay as HTMLInputElement;
  const birthMonth = regFormComponents.birthMonth as HTMLInputElement;
  const birthYear = regFormComponents.birthYear as HTMLInputElement;
  const paddedDay = birthDay.value.padStart(2, '0');
  const paddedMonth = birthMonth.value.padStart(2, '0');
  const paddedYear = birthYear.value.padStart(4, '0');
  const date = `${paddedDay}${paddedMonth}${paddedYear}`;

  if (Object.values(booleanValid.validStatus).every((value) => value)) {
    console.log(countryShipping, streetShipping, cityShipping, postShipping);
    const regDate = {
      name: name.value,
      lastName: lastName.value,
      password: password.value,
      mailValue: mail.value,
      date: date,
      country: countryBilling.textContent,
      post: postBilling.value,
      city: cityBilling.value,
      street: streetBilling.value,
    };
    console.log(regDate);
  } else {
    throw new Error('Error');
  }
}
