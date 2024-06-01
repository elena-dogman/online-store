import { Category } from '@commercetools/platform-sdk';
import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../../utils/baseComponent';
import {
  fetchProductAttributes,
  fetchCategories,
} from '../../../api/apiService';

export async function createFilterComponent(): Promise<HTMLElement> {
  const filterContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-container'],
  };
  const filterContainer = createElement(filterContainerParams);

  const sizesResponse = await fetchProductAttributes();
  const categoriesResponse = await fetchCategories();

  if (categoriesResponse) {
    console.log('Categories Response:', categoriesResponse);

    const categoryOrder = ['men', 'women', 'unisex', 'kids'];

    const sortedCategories = categoriesResponse.sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.slug['en-US']);
      const bIndex = categoryOrder.indexOf(b.slug['en-US']);
      return aIndex - bIndex;
    });

    sortedCategories.forEach((category) => {
      if (!category.parent) {
        const filterGroup = createCategoryFilterGroup(
          category,
          categoriesResponse,
        );
        addInnerComponent(filterContainer, filterGroup);
      }
    });
  }

  if (sizesResponse) {
    console.log('Sizes Response:', sizesResponse);
    const filterGroup = createFilterGroup('size', sizesResponse);
    filterGroup.classList.add('size-filter-group');
    addInnerComponent(filterContainer, filterGroup);
  }

  return filterContainer;
}

function createCategoryFilterGroup(
  category: Category,
  allCategories: Category[],
): HTMLElement {
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
    textContent:
      category.name['en-US'].charAt(0).toUpperCase() +
      category.name['en-US'].slice(1),
  };
  const filterLabel = createElement(filterLabelParams);

  const triangleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['triangle'],
  };
  const triangle = createElement(triangleParams);

  const radioContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['radio-container', 'hidden', `${category.id}-radio-container`],
  };
  const radioContainer = createElement(radioContainerParams);

  const subCategories = allCategories.filter(
    (cat) => cat.parent && cat.parent.id === category.id,
  );

  subCategories.forEach((subCategory) => {
    const radioWrapper = createElement({
      tag: 'div',
      classNames: ['radio-wrapper'],
    });

    const radio = createElement({
      tag: 'input',
      attributes: { type: 'radio', name: 'category', value: subCategory.id },
      classNames: ['category-filter'],
    }) as HTMLInputElement;

    radio.addEventListener('change', () => {
      const event = new CustomEvent('filtersChanged', {
        detail: {
          name: 'category',
          value: radio.value,
          checked: radio.checked,
        },
      });
      filterGroup.dispatchEvent(event);
    });

    const radioLabel = createElement({
      tag: 'label',
      textContent: subCategory.name['en-US'],
    });

    radioLabel.addEventListener('click', () => {
      radio.checked = true;
      const event = new Event('change', { bubbles: true });
      radio.dispatchEvent(event);
    });

    addInnerComponent(radioWrapper, radio);
    addInnerComponent(radioWrapper, radioLabel);

    addInnerComponent(radioContainer, radioWrapper);
  });

  const toggleMenu = (): void => {
    radioContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  };

  filterLabel.addEventListener('click', toggleMenu);
  triangle.addEventListener('click', toggleMenu);

  addInnerComponent(filterLabelWrapper, filterLabel);
  addInnerComponent(filterLabelWrapper, triangle);
  addInnerComponent(filterGroup, filterLabelWrapper);
  addInnerComponent(filterGroup, radioContainer);

  return filterGroup;
}

function createFilterGroup(
  name: string,
  values: (string | number)[],
): HTMLElement {
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

  values.forEach((value) => {
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
      const event = new CustomEvent('filtersChanged', {
        detail: { name, value: checkbox.value, checked: checkbox.checked },
      });
      filterGroup.dispatchEvent(event);
    });

    const checkboxLabel = createElement({
      tag: 'label',
      textContent: value.toString(),
    });

    checkboxLabel.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked;
      const event = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(event);
    });

    addInnerComponent(checkboxWrapper, checkbox);
    addInnerComponent(checkboxWrapper, checkboxLabel);
    addInnerComponent(checkboxContainer, checkboxWrapper);
  });


  const toggleMenu = (): void => {
    checkboxContainer.classList.toggle('hidden');
    triangle.classList.toggle('open');
  };

  filterLabel.addEventListener('click', toggleMenu);
  triangle.addEventListener('click', toggleMenu);

  addInnerComponent(filterLabelWrapper, filterLabel);
  addInnerComponent(filterLabelWrapper, triangle);
  addInnerComponent(filterGroup, filterLabelWrapper);
  addInnerComponent(filterGroup, checkboxContainer);

  return filterGroup;
}
