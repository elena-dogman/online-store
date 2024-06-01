import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/usefullFunctions/baseComponent';
import { buildProfileCountry } from './addressComponents/buildProfileCountry';
import countrys from 'country-list-js';
import { buildProfileAddressLoyalt } from './addressComponents/addressList';
import { Customer } from '@commercetools/platform-sdk';
export function buildAddressProfile(customerData: Customer): HTMLElement {
  const addressInfoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-form__address-prof-container'],
  };
  const addressInfoContainer = createElement(addressInfoContainerParams);
  if (customerData) {
    customerData.addresses.forEach((e) => {
      const currentId = e.id;
      const bullingId = customerData.billingAddressIds?.toString();
      const shippingId = customerData.shippingAddressIds?.toString();
      const shippingDefaultId = customerData.defaultBillingAddressId;
      const billingDefaultId = customerData.defaultShippingAddressId;
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
  return addressInfoContainer;
}
