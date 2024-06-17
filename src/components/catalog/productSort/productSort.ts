import {
  ElementParams,
  createElement,
  addInnerComponent,
} from '../../../utils/general/baseComponent';

export function createSortComponent(
  onSortChange: (sort: string) => void,
): HTMLElement {
  const sortContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sort-container'],
  };
  const sortContainer = createElement(sortContainerParams);

  const sortLabelParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sort-label'],
    textContent: 'Sort by ',
  };
  const sortLabel = createElement(sortLabelParams);

  const arrowParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['triangle'],
  };
  const arrow = createElement(arrowParams);

  const sortOptionsParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sort-options'],
  };
  const sortOptions = createElement(sortOptionsParams);

  const sortOptionsData = [
    { value: 'price asc', text: 'Lowest price' },
    { value: 'price desc', text: 'Highest price' },
    { value: 'createdAt desc', text: 'Newest' },
  ];

  sortOptionsData.forEach((option) => {
    const labelParams: ElementParams<'label'> = {
      tag: 'label',
    };
    const label = createElement(labelParams);

    const inputParams: ElementParams<'input'> = {
      tag: 'input',
      attributes: { type: 'radio', name: 'sort', value: option.value },
    };
    const input = createElement(inputParams) as HTMLInputElement;
    input.addEventListener('change', () => {
      onSortChange(input.value);
      sortOptions.classList.remove('show');
      arrow.classList.remove('open');
    });

    const textNode = document.createTextNode(option.text);

    label.append(input);
    label.append(textNode);

    sortOptions.append(label);
  });

  sortLabel.addEventListener('click', () => {
    sortOptions.classList.toggle('show');
    arrow.classList.toggle('open');
  });

  addInnerComponent(sortLabel, arrow);
  addInnerComponent(sortContainer, sortLabel);
  addInnerComponent(sortContainer, sortOptions);

  return sortContainer;
}

