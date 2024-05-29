import { Category } from '@commercetools/platform-sdk';
import { fetchCategories } from '../../../api/apiService';

export interface Filters {
  audience: Set<string>;
  category: string | null;
  size: Set<string>;
}

const categoriesMap: Record<string, string> = {};

async function fetchAndMapCategories(): Promise<void> {
  const categories = await fetchCategories();
  categories.forEach((category: Category) => {
    categoriesMap[category.id] = category.name['en-US'];
  });
}

function getFiltersFromURL(): Filters {
  const params = new URLSearchParams(window.location.search);
  const filters: Filters = {
    audience: new Set(params.getAll('audience')),
    category: Object.keys(categoriesMap).find(id => categoriesMap[id] === params.get('category')!) || null,
    size: new Set(params.getAll('size')),
  };
  return filters;
}

function updateURLWithFilters(filters: Filters): void {
  const params = new URLSearchParams();
  filters.audience.forEach(value => params.append('audience', value));
  if (filters.category) {
    const categoryName = categoriesMap[filters.category] || filters.category;
    params.append('category', categoryName);
  }
  filters.size.forEach(value => params.append('size', value));
  history.pushState(null, '', '/catalog?' + params.toString());
}

export { fetchAndMapCategories, getFiltersFromURL, updateURLWithFilters };
