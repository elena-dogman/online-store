import { updateQuantity } from '../../../api/apiService';
import { formatPrice } from '../../../utils/general/price-formatter';

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