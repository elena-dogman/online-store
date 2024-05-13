import * as booleanValid from '../../utils/validations/booleanValid';
import * as regFormComponents from './registrationForm';
import * as dateComponents from './dateComponent';
import * as shippingComponents from './address/shipping';
import * as billingComponents from './address/billing';
import { validStatusAddress } from './address/booleanAddress';
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
  const birthDay = dateComponents.dayDate as HTMLInputElement;
  const birthMonth = dateComponents.monthDate as HTMLInputElement;
  const birthYear = dateComponents.yearDate as HTMLInputElement;
  const paddedDay = birthDay.value.padStart(2, '0');
  const paddedMonth = birthMonth.value.padStart(2, '0');
  const paddedYear = birthYear.value.padStart(4, '0');
  const date = `${paddedDay}${paddedMonth}${paddedYear}`;
  if (Object.values(booleanValid.validStatus).every((value) => value)) {
    if (validStatusAddress.joinAdress) {
      console.log(
        countryShipping.textContent,
        streetShipping.textContent,
        cityShipping.textContent,
        postShipping.textContent,
      );
    }
    const regDate = {
      name: name.value,
      lastName: lastName.value,
      password: password.value,
      mailValue: mail.value,
      date: date,
      address: {
        country: countryBilling.textContent,
        postaCode: postBilling.value,
        city: cityBilling.value,
        streetName: streetBilling.value,
      },
    };
    console.log(regDate);
  } else {
    throw new Error('Error you must enter valid date to submit');
  }
}
