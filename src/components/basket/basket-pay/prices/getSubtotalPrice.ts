import { Cart, LineItem } from '@commercetools/platform-sdk';

export function calculateSubtotal(cart: Cart): number {
  return cart.lineItems.reduce((sum, lineItem: LineItem) => {
    const itemPrice = lineItem.price.discounted
      ? lineItem.price.discounted.value.centAmount
      : lineItem.price.value.centAmount;
    return sum + itemPrice * lineItem.quantity;
  }, 0);
}
