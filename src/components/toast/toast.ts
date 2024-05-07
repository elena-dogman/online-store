import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';

//modalka, append k body
//showToast() {
//receive error.message
//close after 4 secs
//
//RSS-ECOMM-2_04
export function showToast(error: string | undefined): void {
  const bodyApp: HTMLDivElement | null = document.querySelector('#app');
  const toastContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['toast_container'],
  };
  const infoMsgParams: ElementParams<'h1'> = {
    tag: 'h1',
    attributes: {
      textContent:
        'Oops! Something wrong. Wait until window is closed & try again',
    },
    classNames: ['info_msg'],
  };
  const errorMsgParams: ElementParams<'h3'> = {
    tag: 'h3',
    attributes: {
      textContent: `${error}`,
    },
    classNames: ['error_msg'],
  };
  const timerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['timer'],
  };
  const toastContainer = createElement(toastContainerParams);
  const infoMsg = createElement(infoMsgParams);
  const errorMsg = createElement(errorMsgParams);
  const timer = createElement(timerParams);
  addInnerComponent(toastContainer, infoMsg);
  addInnerComponent(toastContainer, errorMsg);
  addInnerComponent(toastContainer, timer);
  if (bodyApp) {
    addInnerComponent(bodyApp, toastContainer);
  }
}
