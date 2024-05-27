import { createElement, addInnerComponent, ElementParams } from '../../../utils/baseComponent';
import { fetchProductAttributes, fetchCategories } from '../../../api/apiService';
import { Category } from '@commercetools/platform-sdk';

export async function createFilterComponent(): Promise<HTMLElement> {
  const filterContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-container'],
  };
  const filterContainer = createElement(filterContainerParams);

  const sizesResponse = await fetchProductAttributes();
  const categoriesResponse = await fetchCategories();

  if (sizesResponse) {
    console.log('Sizes Response:', sizesResponse);
    const filterGroup = createFilterGroup('size', sizesResponse);
    addInnerComponent(filterContainer, filterGroup);
  }

  if (categoriesResponse) {
    console.log('Categories Response:', categoriesResponse);
    categoriesResponse.forEach(category => {
      if (!category.parent) {
        const filterGroup = createCategoryFilterGroup(category, categoriesResponse);
        addInnerComponent(filterContainer, filterGroup);
      }
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
    }) as HTMLInputElement;

    checkbox.addEventListener('change', () => {
      console.log('Checkbox changed:', { name, value: checkbox.value, checked: checkbox.checked });
      const event = new CustomEvent('filtersChanged', { detail: { name, value: checkbox.value, checked: checkbox.checked } });
      filterGroup.dispatchEvent(event);
    });

    const checkboxLabel = createElement({
      tag: 'label',
      textContent: value.toString(),
    });

    addInnerComponent(checkboxWrapper, checkbox);
    addInnerComponent(checkboxWrapper, checkboxLabel);
    addInnerComponent(checkboxContainer, checkboxWrapper);
  });

  filterLabel.addEventListener('click', () => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  });

  triangle.addEventListener('click', () => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  });

  addInnerComponent(filterLabelWrapper, filterLabel);
  addInnerComponent(filterLabelWrapper, triangle);
  addInnerComponent(filterGroup, filterLabelWrapper);
  addInnerComponent(filterGroup, checkboxContainer);

  return filterGroup;
}

function createCategoryFilterGroup(category: Category, allCategories: Category[]): HTMLElement {
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
    textContent: category.name['en-US'].charAt(0).toUpperCase() + category.name['en-US'].slice(1),
  };
  const filterLabel = createElement(filterLabelParams);

  const triangleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['triangle'],
  };
  const triangle = createElement(triangleParams);

  const checkboxContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['checkbox-container', 'hidden', `${category.id}-checkbox-container`],
  };
  const checkboxContainer = createElement(checkboxContainerParams);

  const subCategories = allCategories.filter(cat => cat.parent && cat.parent.id === category.id);

  subCategories.forEach(subCategory => {
    const checkboxWrapper = createElement({
      tag: 'div',
      classNames: ['checkbox-wrapper'],
    });

    const checkbox = createElement({
      tag: 'input',
      attributes: { type: 'checkbox', value: subCategory.id },
      classNames: ['category-filter'],
    }) as HTMLInputElement;

    checkbox.addEventListener('change', () => {
      const event = new CustomEvent('filtersChanged', { detail: { name: 'category', value: checkbox.value, checked: checkbox.checked } });
      filterGroup.dispatchEvent(event);
    });

    const checkboxLabel = createElement({
      tag: 'label',
      textContent: subCategory.name['en-US'],
    });

    addInnerComponent(checkboxWrapper, checkbox);
    addInnerComponent(checkboxWrapper, checkboxLabel);
    addInnerComponent(checkboxContainer, checkboxWrapper);
  });

  filterLabel.addEventListener('click', () => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  });

  triangle.addEventListener('click', () => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  });

  addInnerComponent(filterLabelWrapper, filterLabel);
  addInnerComponent(filterLabelWrapper, triangle);
  addInnerComponent(filterGroup, filterLabelWrapper);
  addInnerComponent(filterGroup, checkboxContainer);

  return filterGroup;
}
