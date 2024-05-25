import { getUserData } from '../../../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';
import {
  buildCountriesList,
  buildProfileAddressLoyalt,
  buildProfileCountry,
} from './addressComponents';
import countrys from 'country-list-js';
export function buildAddressProfile(): HTMLElement {
  const addressInfoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-main__address-prof-container'],
  };
  const addressInfoContainer = createElement(addressInfoContainerParams);
  getUserData()
    .then((userData) => {
      if (userData) {
        userData.body.addresses.forEach((e) => {
          const currentId = e.id;
          const bullingId = userData.body.billingAddressIds?.toString();
          const shippingId = userData.body.shippingAddressIds?.toString();
          const shippingDefaultId = userData.body.defaultShippingAddressId;
          const billingDefaultId = userData.body.defaultBillingAddressId;
          const city = e.city ? e.city : '';
          const post = e.postalCode ? e.postalCode : '';
          const country = countrys.findByIso2(e.country);
          const street = e.streetName ? e.streetName : '';
          const addressInfWrapperParams: ElementParams<'div'> = {
            tag: 'div',
            classNames: ['address-prof-container__address-wrapper'],
          };
          const addressInfWrapper = createElement(addressInfWrapperParams);
          const [countryContainer, countryInput] = buildProfileCountry(
            currentId,
            bullingId,
            shippingId,
            shippingDefaultId,
            billingDefaultId,
          );
          const [
            streetLabel,
            cityLabel,
            postLabel,
            streetInput,
            cityInput,
            postInput,
          ] = buildProfileAddressLoyalt();
          console.log(cityInput);
          cityInput.value = city;
          postInput.value = post;
          countryInput.value = country.name;
          streetInput.value = street;
          addInnerComponent(addressInfoContainer, addressInfWrapper);
          addInnerComponent(addressInfWrapper, countryContainer);
          addInnerComponent(addressInfWrapper, postLabel);
          addInnerComponent(addressInfWrapper, cityLabel);
          addInnerComponent(addressInfWrapper, streetLabel);
        });
      }
    })
    .catch((eror) => {
      console.log(eror);
    });
  buildCountriesList();
  return addressInfoContainer;
}
