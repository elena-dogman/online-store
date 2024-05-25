import { createElement, addInnerComponent,  ElementParams } from '../../../utils/baseComponent';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function createPagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps): HTMLElement {
  const paginationContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['pagination'],
  };
  const paginationContainer = createElement(paginationContainerParams);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageButton = (pageNumber: number): HTMLElement => {
    const pageButton = createElement({
      tag: 'button',
      textContent: pageNumber.toString(),
      classNames: pageNumber === currentPage ? ['pagination-button', 'active'] : ['pagination-button'],
      callbacks: [
        {
          eventType: 'click',
          callback: (): void => {
            onPageChange(pageNumber);
          },
        },
      ],
    });

    return pageButton;
  };

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i);
    addInnerComponent(paginationContainer, pageButton);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (event.key === 'ArrowRight' && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  });

  return paginationContainer;
}
