import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import { addDate } from './dateComponent';
import { createDefaultCheck } from './address/checkBoxes/addressCheckBoxes';
import { addressesContainer } from './address/addressFactory';
import { commonFormCompontens } from './nameMailForm';
import { submitRegData } from './submitRegData';
import { addDefaultChecks } from './address/checkBoxes/checkBoxesComponents';
import {
  fillObjectWithUniqueKeys,
  profileBoolValidation,
} from '../profileComponents/infoEdit/infoBoolean';
export const errorNameReg = errors.createErrorElement();
export const errorLastNameReg = errors.createErrorElement();
export const authSideForm = createElement({
  tag: 'form',
  classNames: ['auth-side__reg-form'],
}) as HTMLFormElement;
const regDateAndCheckContainerParams: ElementParams<'div'> = {
  tag: 'div',
  classNames: ['reg-form__container__date-checks'],
};

const regDateAndCheckContainer = createElement(regDateAndCheckContainerParams);

const address = createElement({
  tag: 'div',
  classNames: ['reg-form__address'],
});

export const authFormButton = createElement({
  tag: 'button',
  classNames: ['reg-form__button', 'reg-button'],
  attributes: { type: 'button', disabled: '' },
  textContent: 'Create Account',
});

export function createForm(): void {
  addInnerComponent(authSideForm, commonFormCompontens.container);
  addInnerComponent(authSideForm, regDateAndCheckContainer);
  addInnerComponent(regDateAndCheckContainer, addDate());
  addInnerComponent(authSideForm, createDefaultCheck()[0]);
  addInnerComponent(authSideForm, addressesContainer);
  addInnerComponent(authSideForm, address);
  addInnerComponent(authSideForm, addDefaultChecks());
  addInnerComponent(authSideForm, authFormButton);
  fillObjectWithUniqueKeys(authSideForm);
  console.log(profileBoolValidation);
  authFormButton.addEventListener('click', submitRegData);
}
