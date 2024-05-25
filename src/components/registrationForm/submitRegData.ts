import * as dateComponents from './dateComponent';
import country from 'country-list-js';
import { validStatusAddress } from './address/booleanAddress';
import {
  billingComponents,
  shippingComponents,
} from './address/addressFactory';
import { regUser } from '../../api/apiService';
import { RegistrationData } from './regDataInterface';
import { commonFormCompontens } from './nameMailForm';
export async function submitRegData(): Promise<void> {
  const name = commonFormCompontens.inputName as HTMLInputElement;
  const lastName = commonFormCompontens.inputLastName as HTMLInputElement;
  const password = commonFormCompontens.inputPassword as HTMLInputElement;
  const mail = commonFormCompontens.inputMail as HTMLInputElement;
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
  const DOB = `${paddedYear}-${paddedMonth}-${paddedDay}`;
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
      isDefault: validStatusAddress.shippingIsDefault,
      country: shippingPostCode,
      postaCode: postShipping.value,
      city: cityShipping.value,
      streetName: streetShipping.value,
    },
    billingAddress: {
      isDefault: validStatusAddress.billingIsDefault,
      country: billingPostCode,
      postaCode: postBilling.value,
      city: cityBilling.value,
      streetName: streetBilling.value,
    },
  };
  await regUser(regData);
}
