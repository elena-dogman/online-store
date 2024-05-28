import { Category } from '@commercetools/platform-sdk';
import { fetchCategories } from '../../../api/apiService';

export interface Filters {
  audience: Set<string>;
  category: Set<string>;
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
    category: new Set(
      params.getAll('category')
        .map(name => Object.keys(categoriesMap)
          .find(id => categoriesMap[id] === name) || name)),
    size: new Set(params.getAll('size')),
  };
  return filters;
}

function updateURLWithFilters(filters: Filters): void {
  const params = new URLSearchParams();
  filters.audience.forEach(value => params.append('audience', value));
  filters.category.forEach(value => {
    const categoryName = categoriesMap[value] || value;
    params.append('category', categoryName);
  });
  filters.size.forEach(value => params.append('size', value));
  history.pushState(null, '', '?' + params.toString());
}

export { fetchAndMapCategories, getFiltersFromURL, updateURLWithFilters };
