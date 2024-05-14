import * as regFormComponents from './registrationForm';
import * as dateComponents from './dateComponent';

import { validStatusAddress } from './address/booleanAddress';
import { billingComponents, shippingComponents } from './address/addressFactory';
export function submitRegData(): void {
  const name = regFormComponents.regFormInputName as HTMLInputElement;
  const lastName = regFormComponents.regFormInputLastName as HTMLInputElement;
  const password = regFormComponents.regFormInputPassword as HTMLInputElement;
  const mail = regFormComponents.regFormInputMail as HTMLInputElement;
  const postShipping = shippingComponents.inputPost as HTMLInputElement;
  const postBilling = billingComponents.inputPost as HTMLInputElement;
  const cityBilling = billingComponents.inputCity as HTMLInputElement;
  const cityShipping = shippingComponents.inputCity as HTMLInputElement;
  const streetShipping =
    shippingComponents.inputStreet as HTMLInputElement;
  const streetBilling =
    billingComponents.inputStreet as HTMLInputElement;
  const countryShipping = shippingComponents.listCountry;
  const countryBilling = billingComponents.listCountry;
  const birthDay = dateComponents.dayDate as HTMLInputElement;
  const birthMonth = dateComponents.monthDate as HTMLInputElement;
  const birthYear = dateComponents.yearDate as HTMLInputElement;
  const paddedDay = birthDay.value.padStart(2, '0');
  const paddedMonth = birthMonth.value.padStart(2, '0');
  const paddedYear = birthYear.value.padStart(4, '0');
  const date = `${paddedDay}${paddedMonth}${paddedYear}`;

  if (validStatusAddress.joinAdress) {
    countryBilling.textContent = countryShipping.textContent;
    streetBilling.value = streetShipping.value;
    cityBilling.value = cityShipping.value;
    postBilling.value = postShipping.value;
  }

  const regDate = {
    name: name.value,
    lastName: lastName.value,
    password: password.value,
    mailValue: mail.value,
    date: date,
    shippingAddress: {
      country: countryShipping.textContent,
      postaCode: postShipping.value,
      city: cityShipping.value,
      streetName: streetShipping.value,
    },
    billingAddress: {
      country: countryBilling.textContent,
      postaCode: postBilling.value,
      city: cityBilling.value,
      streetName: streetBilling.value,
    },
  };
  console.log(regDate);
}
