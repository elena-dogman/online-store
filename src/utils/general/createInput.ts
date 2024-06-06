import { ElementParams, createElement } from './baseComponent';

export function createInput(
  id: string,
  classes: string[][],
  validationType: string,
  type: string = 'text',
): [HTMLLabelElement, HTMLInputElement] {
  const inputParams: ElementParams<'input'> = {
    tag: 'input',
    attributes: {
      id: id,
      type: type,
      name: id,
      'data-validation-type': validationType,
      required: '',
    },
    classNames: classes[1],
  };
  const labelParams: ElementParams<'label'> = {
    tag: 'label',
    textContent: id,
    attributes: {
      for: id,
    },
    classNames: classes[0],
  };
  const input = createElement(inputParams) as HTMLInputElement;
  const label = createElement(labelParams) as HTMLLabelElement;
  return [label, input];
}
