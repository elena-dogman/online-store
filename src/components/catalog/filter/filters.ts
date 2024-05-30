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

  if (filters.category) {
    url.searchParams.append('category', categoriesMap[filters.category]?.name || '');
  }

  if (filters.audience.size > 0) {
    url.searchParams.set('audience', Array.from(filters.audience).join(','));
  }

  if (filters.size.size > 0) {
    url.searchParams.set('size', Array.from(filters.size).join(','));
  }

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
