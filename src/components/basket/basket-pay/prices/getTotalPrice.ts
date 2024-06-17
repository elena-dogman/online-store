import { Cart } from '@commercetools/platform-sdk';
import { getActiveCart } from '../../../../api/apiService';

export function getTotalPrice(cart: Cart): number {
  return cart.totalPrice.centAmount;
}

export async function fetchAndPrintTotalPrice(): Promise<number> {
  try {
    const cart = await getActiveCart();
    if (cart) {
      const totalPrice = getTotalPrice(cart);
      return totalPrice;
    } else {
      return 0;
    }
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.error('ReferenceError:', error.message);
    } else {
      console.error('Error fetching cart:', error);
    }
    return 0;
  }
}
