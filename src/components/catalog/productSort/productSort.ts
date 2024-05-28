import { ElementParams, createElement, addInnerComponent } from '../../../utils/baseComponent';


export function createSortComponent(onSortChange: (sort: string) => void): HTMLElement {
  const sortContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sort-container'],
  };
  const sortContainer = createElement(sortContainerParams);

  const sortLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['sort-label'],
    textContent: 'Sort by: ',
  };
  const sortLabel = createElement(sortLabelParams);

  const sortSelectParams: ElementParams<'select'> = {
    tag: 'select',
    classNames: ['sort-select'],
  };
  const sortSelect = createElement(sortSelectParams) as HTMLSelectElement;

  const sortOptions = [
    { value: 'price asc', text: 'Lowest price' },
    { value: 'price desc', text: 'Highest price' },
    { value: 'createdAt desc', text: 'Newest' },
  ];

  sortOptions.forEach(option => {
    const optionElement = createElement({
      tag: 'option',
      attributes: { value: option.value },
      textContent: option.text,
    }) as HTMLOptionElement;
    sortSelect.appendChild(optionElement);
  });

  sortSelect.addEventListener('change', () => {
    onSortChange(sortSelect.value);
  });

  addInnerComponent(sortContainer, sortLabel);
  addInnerComponent(sortContainer, sortSelect);

  return sortContainer;
}
