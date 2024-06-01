import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/usefullFunctions/baseComponent';

export function showToast(error: string | undefined | unknown): void {
  const bodyApp: HTMLDivElement | null = document.querySelector('#app');
  const modalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal_container'],
  };
  const toastContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['toast_container'],
  };
  const infoMsgParams: ElementParams<'h1'> = {
    tag: 'h1',
    textContent:
      'Oops! Something wrong. Wait until window is closed & try again',
    classNames: ['info_msg'],
  };
  const errorMsgParams: ElementParams<'h3'> = {
    tag: 'h3',
    textContent: `${error}`,
    classNames: ['error_msg'],
  };
  const timerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['timer'],
  };
  const toastContainer = createElement(toastContainerParams);
  const modalContainer = createElement(modalContainerParams);
  const infoMsg = createElement(infoMsgParams);
  const errorMsg = createElement(errorMsgParams);
  const timer = createElement(timerParams);
  addInnerComponent(modalContainer, toastContainer);
  addInnerComponent(toastContainer, infoMsg);
  addInnerComponent(toastContainer, errorMsg);
  addInnerComponent(toastContainer, timer);
  if (bodyApp) {
    addInnerComponent(bodyApp, modalContainer);
  }
  let countdown = 5;
  const intervalId = setInterval(() => {
    countdown--;
    timer.textContent = `This window will be closed in ${countdown} seconds.`;
    if (countdown === 1) {
      clearInterval(intervalId);
      modalContainer.remove();
    }
  }, 1000);
}
