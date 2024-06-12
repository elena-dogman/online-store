import { updateQuantity } from '../../../api/apiService';
import { formatPrice } from '../../../utils/general/price-formatter';
import { fetchAndPrintTotalPrice } from '../basket-pay/getTotalPrice';

export function setupQuantityHandlers(
  countView: HTMLElement,
  totalPriceElement: HTMLElement,
  countSubtract: HTMLElement,
  countAdd: HTMLElement,
  itemId: string,
  initialCount: number,
  price: number,
): void {
  let currentCount = initialCount;

  const updateItemQuantity = async (newCount: number): Promise<void> => {
    const updatedItem = await updateQuantity(itemId, newCount);
    if (updatedItem) {
      currentCount = updatedItem.quantity;
      countView.textContent = updatedItem.quantity.toString();
      totalPriceElement.textContent = `Total: ${formatPrice(price * updatedItem.quantity)}`;

      const totalPrice = await fetchAndPrintTotalPrice();
      updateTotalPriceUI(totalPrice);
    }
  };

  countSubtract.addEventListener('click', () => {
    if (currentCount > 1) {
      updateItemQuantity(currentCount - 1);
    }
  });

  countAdd.addEventListener('click', () => {
    updateItemQuantity(currentCount + 1);
  });
}

export function updateTotalPriceUI(totalPrice: number): void {
  const totalPriceElement = document.querySelector(
    '.basket-inf-container__total-price',
  );
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${(totalPrice / 100).toFixed(2)}`;
  }

  const subtotalPriceElement = document.querySelector(
    '.basket-inf-container__subtotal-price',
  );
  if (subtotalPriceElement) {
    subtotalPriceElement.textContent = `$${(totalPrice / 100).toFixed(2)}`;
  }
}
