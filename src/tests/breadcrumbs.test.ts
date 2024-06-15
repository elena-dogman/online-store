// tests/buildBreadcrumbsFromUrl.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { categoriesMap } from '../components/catalog/filter/filters';
import { buildBreadcrumbsFromUrl } from '../components/breadcrumbs/breadcrumbs';



vi.mock('../catalog/filter/filters', () => ({
  buildCategoryPath: vi.fn(),
  categoriesMap: {},
}));

describe('buildBreadcrumbsFromUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(categoriesMap, {
      '1': { id: '1', name: { 'en-US': 'Category 1' }, slug: { 'en-US': 'category-1' } },
      '2': { id: '2', name: { 'en-US': 'Category 2' }, slug: { 'en-US': 'category-2' }, parent: { id: '1' } },
    });
  });

  it('should return home and catalog breadcrumbs if no categories in URL', async () => {
    const originalUrl = window.location.href;
    Object.defineProperty(window, 'location', {
      value: {
        href: `${originalUrl}?other=param`,
        searchParams: new URLSearchParams('?other=param'),
      },
      writable: true,
    });

    const breadcrumbs = await buildBreadcrumbsFromUrl();

    expect(breadcrumbs).toEqual([
      { name: 'home', url: '/' },
      { name: 'catalog', url: '/catalog' },
    ]);
  });
});
