import * as regFormComponents from './registrationForm';
import * as dateComponents from './dateComponent';
import country from 'country-list-js';
import { validStatusAddress } from './address/booleanAddress';
<<<<<<< HEAD
import {
  billingComponents,
  shippingComponents,
} from './address/addressFactory';
export function submitRegData(): void {
=======
import { regUser } from '../../api/apiService';
import { RegistrationData } from './regDataInterface';
export async function submitRegData(): Promise<void> {
>>>>>>> 2bc9364 (feat: implement user registration on server)
  const name = regFormComponents.regFormInputName as HTMLInputElement;
  const lastName = regFormComponents.regFormInputLastName as HTMLInputElement;
  const password = regFormComponents.regFormInputPassword as HTMLInputElement;
  const mail = regFormComponents.regFormInputMail as HTMLInputElement;
  const postShipping = shippingComponents.inputPost as HTMLInputElement;
  const postBilling = billingComponents.inputPost as HTMLInputElement;
  const cityBilling = billingComponents.inputCity as HTMLInputElement;
  const cityShipping = shippingComponents.inputCity as HTMLInputElement;
  const streetShipping = shippingComponents.inputStreet as HTMLInputElement;
  const streetBilling = billingComponents.inputStreet as HTMLInputElement;
  const countryShipping = shippingComponents.listCountry;
  const countryBilling = billingComponents.listCountry;
  const birthDay = dateComponents.dayDate as HTMLInputElement;
  const birthMonth = dateComponents.monthDate as HTMLInputElement;
  const birthYear = dateComponents.yearDate as HTMLInputElement;
  const paddedDay = birthDay.value.padStart(2, '0');
  const paddedMonth = birthMonth.value.padStart(2, '0');
  const paddedYear = birthYear.value.padStart(4, '0');
  const date = `${paddedDay}${paddedMonth}${paddedYear}`;
  ///formatting dob to ISO8601
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4);
  const DOB: string = `${year}-${month}-${day}`;

  const countryNames = country.names();
  const countryBillingIndex = countryNames.indexOf(countryBilling.textContent);
  const countryShippingIndex = countryNames.indexOf(
    countryShipping.textContent,
  );
  let billingPostCode = Object.keys(country.all)[countryBillingIndex];
  const shippingPostCode = Object.keys(country.all)[countryShippingIndex];
  if (validStatusAddress.joinAdress) {
    billingPostCode = shippingPostCode;
    streetBilling.value = streetShipping.value;
    cityBilling.value = cityShipping.value;
    postBilling.value = postShipping.value;
  }

  const regData: RegistrationData = {
    name: name.value,
    lastName: lastName.value,
    password: password.value,
    mailValue: mail.value,
    DOB: DOB,
    shippingAddress: {
<<<<<<< HEAD
      country: shippingPostCode,
=======
      country: 'AF',
>>>>>>> 2bc9364 (feat: implement user registration on server)
      postaCode: postShipping.value,
      city: cityShipping.value,
      streetName: streetShipping.value,
    },
    billingAddress: {
<<<<<<< HEAD
      country: billingPostCode,
=======
      country: 'AF',
>>>>>>> 2bc9364 (feat: implement user registration on server)
      postaCode: postBilling.value,
      city: cityBilling.value,
      streetName: streetBilling.value,
    },
  };
  await regUser(regData);
  console.log(regData);
}
// country: countryShipping.textContent as string,
// country: countryBilling.textContent as string,
