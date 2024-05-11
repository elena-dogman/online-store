import * as booleanValid from './booleanValid';
import * as regFormComponents from '../../components/registrationForm/registrationForm';
export function submitRegData(): void {
  const name = regFormComponents.regFormInputName as HTMLInputElement;
  const lastName = regFormComponents.regFormInputLastName as HTMLInputElement;
  const password = regFormComponents.regFormInputPassword as HTMLInputElement;
  const mail = regFormComponents.regFormInputMail as HTMLInputElement;
  const post = regFormComponents.addressInputPost as HTMLInputElement;
  const city = regFormComponents.addressInputCity as HTMLInputElement;
  const street = regFormComponents.addressInputStreet as HTMLInputElement;
  const country = regFormComponents.addressListCountry;
  const birthDay = regFormComponents.birthDay as HTMLInputElement;
  const birthMonth = regFormComponents.birthMonth as HTMLInputElement;
  const birthYear = regFormComponents.birthYear as HTMLInputElement;
  const date = `${birthDay.value.padStart(2, '0')}${birthMonth.value.padStart(2, '0')}${birthYear.value.padStart(2, '0')}`;
  if (
    booleanValid.validStatus.name &&
    booleanValid.validStatus.lastName &&
    booleanValid.validStatus.password &&
    booleanValid.validStatus.mail &&
    booleanValid.validStatus.date &&
    booleanValid.validStatus.post &&
    booleanValid.validStatus.city &&
    booleanValid.validStatus.street
  ) {
    const regDate = {
      name: name.value,
      lastName: lastName.value,
      password: password.value,
      mailValue: mail.value,
      date: date,
      country: country.textContent,
      post: post.value,
      city: city.value,
      street: street.value,
    };
    console.log(regDate);
  } else {
    throw new Error('Error');
  }
}
