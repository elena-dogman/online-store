import { Cart } from '@commercetools/platform-sdk';
import { getActiveCart } from '../../../../api/apiService';

export function getTotalPrice(cart: Cart): number {
  return cart.totalPrice.centAmount;
}

export async function fetchAndPrintTotalPrice(): Promise<number> {
  try {
    const cart = await getActiveCart();
    console.log('Fetched cart:', cart);
    if (cart) {
      const totalPrice = getTotalPrice(cart);
      console.log(`Total Price in Cents: ${totalPrice}`);
      return totalPrice;
    } else {
      console.log('No active cart found.');
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
