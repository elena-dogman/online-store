import { Category } from '@commercetools/platform-sdk';
import { fetchCategories } from '../../api/apiService';
import { buildCategoryPath, categoriesMap } from '../catalog/filter/filters';
import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/general/baseComponent';
import { navigateTo } from '../../router/router';
import { RoutePaths } from '../../types/types';

export async function fetchCategoryTree(): Promise<Category[]> {
  const categories = await fetchCategories();
  return categories;
}

export async function buildBreadcrumbsFromUrl(): Promise<
  { name: string; url: string }[]
> {
  const url = new URL(window.location.href);
  const categoryNames = url.searchParams.getAll('category');

  const breadcrumbs = [
    { name: 'home', url: RoutePaths.Main },
    { name: 'catalog', url: '/catalog' },
  ];

  if (categoryNames.length === 0) {
    return breadcrumbs;
  }

  const addedCategories = new Set<string>();
  categoryNames.forEach((categoryName) => {
    const categoryId = Object.keys(categoriesMap).find(
      (id) => categoriesMap[id].name === categoryName,
    );
    if (categoryId && !addedCategories.has(categoryId)) {
      const categoryPath = buildCategoryPath(categoryId);
      categoryPath.forEach((category) => {
        if (!addedCategories.has(category.id)) {
          breadcrumbs.push({
            name: category.name,
            url: `/catalog?category=${category.name}`,
          });
          addedCategories.add(category.id);
        }
      });
    }
  });

  return breadcrumbs;
}

export function generateBreadcrumbLinks(
  breadcrumbs: { name: string; url: string }[],
): HTMLElement {
  const breadcrumbContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['breadcrumb-container'],
  };
  const breadcrumbContainer = createElement(breadcrumbContainerParams);

  breadcrumbs.forEach((breadcrumb, index) => {
    const breadcrumbItemParams: ElementParams<'a'> = {
      tag: 'a',
      classNames: ['breadcrumb-item'],
      textContent: breadcrumb.name,
      attributes: { href: breadcrumb.url },
    };
    const breadcrumbItem = createElement(breadcrumbItemParams);

    breadcrumbItem.addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo(breadcrumb.url);
    });

    addInnerComponent(breadcrumbContainer, breadcrumbItem);

    if (index < breadcrumbs.length - 1) {
      const separatorParams: ElementParams<'span'> = {
        tag: 'span',
        textContent: '>',
      };
      const separator = createElement(separatorParams);
      addInnerComponent(breadcrumbContainer, separator);
    }
  });

  return breadcrumbContainer;
}
