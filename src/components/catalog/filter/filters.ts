import { Category } from '@commercetools/platform-sdk';
import { fetchCategories } from '../../../api/apiService';

export interface Filters {
  audience: Set<string>;
  category: string;
  size: Set<string>;
}

const categoriesMap: Record<string, { name: string, parent?: string }> = {};

export async function fetchAndMapCategories(): Promise<void> {
  const categories = await fetchCategories();
  categories.forEach((category: Category) => {
    categoriesMap[category.id] = { name: category.name['en-US'], parent: category.parent?.id };
  });
}


export function getFiltersFromURL(): Filters {
  const params = new URLSearchParams(window.location.search);
  const filters: Filters = {
    audience: new Set(params.getAll('audience')),
    category: Object.keys(categoriesMap).find(id => categoriesMap[id].name === params.get('category')) || '',
    size: new Set(params.getAll('size')),
  };
  return filters;
}

export function updateURLWithFilters(filters: Filters): void {
  const url = new URL(window.location.href);

  url.searchParams.forEach((_, key) => {
    url.searchParams.delete(key);
  });

  Object.keys(filters).forEach(key => {
    const filterKey = key as keyof Filters;
    if (filterKey === 'category' && filters[filterKey]) {
      const categoryPath = filters[filterKey].split(',').map(categoryName => {
        return { id: categoryName, name: categoriesMap[categoryName].name };
      });
      categoryPath.forEach(category => {
        url.searchParams.append('category', category.name);
      });
    } else if (filters[filterKey] instanceof Set) {
      const values = Array.from(filters[filterKey] as Set<string>);
      if (values.length > 0) {
        url.searchParams.set(filterKey, values.join(','));
      }
    }
  });

  history.pushState({}, '', url.toString());
}

export function buildCategoryPath(categoryId: string): { id: string, name: string }[] {
  const path: { id: string, name: string }[] = [];
  let currentCategory = categoriesMap[categoryId];
  while (currentCategory) {
    path.unshift({ id: categoryId, name: currentCategory.name });
    if (currentCategory.parent) {
      categoryId = currentCategory.parent;
      currentCategory = categoriesMap[categoryId];
    } else {
      break;
    }
  }
  return path;
}

export { categoriesMap };
