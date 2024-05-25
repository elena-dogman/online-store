import { createElement, addInnerComponent, ElementParams } from '../../../utils/baseComponent';
import { fetchProductAttributes } from '../../../api/apiService';

export async function createFilterComponent(): Promise<HTMLElement> {
  const filterContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-container'],
  };
  const filterContainer = createElement(filterContainerParams);

  const attributesResponse = await fetchProductAttributes();

  if (attributesResponse) {
    attributesResponse.attributes.forEach(attribute => {
      const filterGroup = createFilterGroup(attribute.name, attribute.values);
      addInnerComponent(filterContainer, filterGroup);
    });
  }

  return filterContainer;
}

function createFilterGroup(name: string, values: (string | number)[]): HTMLElement {
  const filterGroupParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-group'],
  };
  const filterGroup = createElement(filterGroupParams);


  const filterLabelWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-label-wrapper'],
  };
  const filterLabelWrapper = createElement(filterLabelWrapperParams);

  const filterLabelParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-label'],
    textContent: name.charAt(0).toUpperCase() + name.slice(1),
  };
  const filterLabel = createElement(filterLabelParams);

    const triangleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['triangle'],
  };
  const triangle = createElement(triangleParams);

  const checkboxContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['checkbox-container', 'hidden', `${name}-checkbox-container`],
  };
  const checkboxContainer = createElement(checkboxContainerParams);

  values.forEach(value => {
    const checkboxWrapper = createElement({
      tag: 'div',
      classNames: ['checkbox-wrapper'],
    });

    const checkbox = createElement({
      tag: 'input',
      attributes: { type: 'checkbox', value: value.toString() },
      classNames: [`${name}-filter`],
    });

    const checkboxLabel = createElement({
      tag: 'label',
      textContent: value.toString(),
    });

    addInnerComponent(checkboxWrapper, checkbox);
    addInnerComponent(checkboxWrapper, checkboxLabel);
    addInnerComponent(checkboxContainer, checkboxWrapper);
  });

const toggleCheckboxContainer = (): void => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  };

  filterLabel.addEventListener('click', toggleCheckboxContainer);
  triangle.addEventListener('click', toggleCheckboxContainer);


  addInnerComponent(filterLabelWrapper, filterLabel);
  addInnerComponent(filterLabelWrapper, triangle);
  addInnerComponent(filterGroup, filterLabelWrapper);
  addInnerComponent(filterGroup, checkboxContainer);
  return filterGroup;
}
