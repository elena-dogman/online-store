import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';
import { buildProfileCountry } from './addressComponents/buildProfileCountry';
import countrys from 'country-list-js';
import { buildProfileAddressLoyalt } from './addressComponents/addressList';
import { Customer } from '@commercetools/platform-sdk';
import { randomString } from '../../../../utils/general/randomId';
import { buildDeleteAddressBtn } from './deleteAddress/deleteAddress';
export function buildAddressProfile(customerData: Customer): HTMLElement {
  const addressInfoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-form__address-prof-container'],
  };
  const addressInfoContainer = createElement(addressInfoContainerParams);
  if (customerData) {
    customerData.addresses.forEach((e) => {
      if (e.id) {
        const currentId = e.id;
        const deleteBtn = buildDeleteAddressBtn();
        const bullingId = customerData.billingAddressIds as string[];
        const shippingId = customerData.shippingAddressIds as string[];
        const shippingDefaultId = customerData.defaultShippingAddressId;
        const billingDefaultId = customerData.defaultBillingAddressId;
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
          billingDefaultId,
          shippingDefaultId,
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
        const key = randomString();
        postInput.setAttribute('addressId', e.id);
        postInput.setAttribute('addressKey', key);
        postInput.value = post;
        countriesList.textContent = country.name;
        streetInput.value = street;
        addInnerComponent(addressInfoContainer, addressInfWrapper);
        addInnerComponent(addressInfWrapper, countriesContainer);
        addInnerComponent(addressInfWrapper, postLabel);
        addInnerComponent(addressInfWrapper, cityLabel);
        addInnerComponent(addressInfWrapper, streetLabel);
        addInnerComponent(addressInfWrapper, deleteBtn);
      }
    });
  }

  return addressInfoContainer;
}
export function addEmptyCountryList(): HTMLElement {
  const addressInfWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof-container__address-wrapper'],
  };
  const addressInfWrapper = createElement(addressInfWrapperParams);
  const [countriesContainer, countriesList] = buildProfileCountry(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  const [streetLabel, cityLabel, postLabel, streetInput, cityInput, postInput] =
    buildProfileAddressLoyalt();
  const deleteBtn = buildDeleteAddressBtn();
  addInnerComponent(addressInfWrapper, countriesContainer);
  addInnerComponent(addressInfWrapper, postLabel);
  addInnerComponent(addressInfWrapper, cityLabel);
  addInnerComponent(addressInfWrapper, streetLabel);
  addInnerComponent(addressInfWrapper, deleteBtn);
  cityInput.value = '';
  postInput.value = '';
  countriesList.textContent = 'Chose your Country';
  streetInput.value = '';
  streetInput.setAttribute('disabled', '');
  postInput.setAttribute('disabled', '');
  cityInput.setAttribute('disabled', '');
  return addressInfWrapper;
}
