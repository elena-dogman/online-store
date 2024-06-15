import { describe, it, expect } from 'vitest';
import { Cart, LineItem, CentPrecisionMoney, DiscountedPrice, ProductDiscountReference } from '@commercetools/platform-sdk';
import { calculateSubtotal } from '../components/basket/basket-pay/prices/getSubtotalPrice';

describe('calculateSubtotal', () => {
  const createMockCentPrecisionMoney = (centAmount: number): CentPrecisionMoney => ({
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount,
    fractionDigits: 2,
  });

  const createMockProductDiscountReference = (): ProductDiscountReference => ({
    typeId: 'product-discount',
    id: 'discount1',
  });

  const createMockDiscountedPrice = (centAmount: number): DiscountedPrice => ({
    value: createMockCentPrecisionMoney(centAmount),
    discount: createMockProductDiscountReference(),
  });

  const createMockLineItem = (quantity: number, price: number, discountedPrice?: number): LineItem => ({
    id: 'lineItem1',
    productId: 'product1',
    name: { 'en-US': 'Test Product' },
    productType: { typeId: 'product-type', id: 'type1' },
    variant: {
      id: 1,
      sku: 'SKU123',
      prices: [],
      images: [],
      attributes: [],
      assets: [],
      availability: { isOnStock: true },
    },
    price: {
      value: createMockCentPrecisionMoney(price),
      discounted: discountedPrice ? createMockDiscountedPrice(discountedPrice) : undefined,
      id: '',
    },
    totalPrice: createMockCentPrecisionMoney(price * quantity),
    quantity,
    discountedPricePerQuantity: [],
    state: [],
    taxedPricePortions: [],
    lineItemMode: 'Standard',
    priceMode: 'Platform',
    addedAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    perMethodTaxRate: [],
  });

  const createMockCart = (lineItems: LineItem[]): Cart => ({
    id: 'cart1',
    version: 1,
    lineItems,
    customLineItems: [],
    totalPrice: createMockCentPrecisionMoney(3000),
    taxedPrice: undefined,
    taxedShippingPrice: undefined,
    discountOnTotalPrice: undefined,
    taxMode: 'Platform',
    taxRoundingMode: 'HalfEven',
    taxCalculationMode: 'LineItemLevel',
    inventoryMode: 'TrackOnly',
    cartState: 'Active',
    shippingMode: 'Single',
    itemShippingAddresses: [],
    discountCodes: [],
    directDiscounts: [],
    refusedGifts: [],
    shipping: [],
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    origin: '',
  });

  it('should calculate subtotal correctly for line items without discounts', () => {
    const lineItems = [
      createMockLineItem(2, 1000),
      createMockLineItem(1, 2000),
    ];

    const cart = createMockCart(lineItems);
    const subtotal = calculateSubtotal(cart);

    expect(subtotal).toBe(4000);
  });

  it('should calculate subtotal correctly for line items with discounts', () => {
    const lineItems = [
      createMockLineItem(2, 1000, 800),
      createMockLineItem(1, 2000, 1500),
    ];

    const cart = createMockCart(lineItems);
    const subtotal = calculateSubtotal(cart);

    expect(subtotal).toBe(3100);
  });

  it('should handle mixed line items with and without discounts', () => {
    const lineItems = [
      createMockLineItem(2, 1000, 800),
      createMockLineItem(1, 2000),
    ];

    const cart = createMockCart(lineItems);
    const subtotal = calculateSubtotal(cart);

    expect(subtotal).toBe(3600);
  });

  it('should return 0 for an empty cart', () => {
    const cart = createMockCart([]);
    const subtotal = calculateSubtotal(cart);

    expect(subtotal).toBe(0);
  });
});
