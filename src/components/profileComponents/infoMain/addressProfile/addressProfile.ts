import { getUserData } from '../../../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';
import { buildProfileCountry } from './addressComponents/buildProfileCountry';
import countrys from 'country-list-js';
import { buildProfileAddressLoyalt } from './addressComponents/addressList';
export function buildAddressProfile(): HTMLElement {
  const addressInfoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-form__address-prof-container'],
  };
  const addressInfoContainer = createElement(addressInfoContainerParams);
  getUserData()
    .then((userData) => {
      if (userData) {
        userData.body.addresses.forEach((e) => {
          const currentId = e.id;
          const bullingId = userData.body.billingAddressIds?.toString();
          const shippingId = userData.body.shippingAddressIds?.toString();
          const shippingDefaultId = userData.body.defaultBillingAddressId;
          const billingDefaultId = userData.body.defaultShippingAddressId;
          const city = e.city ? e.city : '';
          const post = e.postalCode ? e.postalCode : '';
          const country = countrys.findByIso2(e.country);
          const street = e.streetName ? e.streetName : '';
          const addressInfWrapperParams: ElementParams<'div'> = {
            tag: 'div',
            classNames: ['address-prof-container__address-wrapper'],
          };
          const addressInfWrapper = createElement(addressInfWrapperParams);
          const [countriesContainer, countriesList] = buildProfileCountry(
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
          cityInput.value = city;
          postInput.value = post;
          countriesList.textContent = country.name;
          streetInput.value = street;
          addInnerComponent(addressInfoContainer, addressInfWrapper);
          addInnerComponent(addressInfWrapper, countriesContainer);
          addInnerComponent(addressInfWrapper, postLabel);
          addInnerComponent(addressInfWrapper, cityLabel);
          addInnerComponent(addressInfWrapper, streetLabel);
        });
      }
    })
    .catch((eror) => {
      console.log(eror);
    });
  return addressInfoContainer;
}
