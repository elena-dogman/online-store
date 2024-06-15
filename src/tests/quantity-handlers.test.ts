import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LineItem, Cart, CentPrecisionMoney } from '@commercetools/platform-sdk';
import { updateQuantity, getActiveCart } from '../api/apiService';
import { calculateSubtotal } from '../components/basket/basket-pay/prices/getSubtotalPrice';
import { fetchAndPrintTotalPrice } from '../components/basket/basket-pay/prices/getTotalPrice';
import { setupQuantityHandlers, updateTotalPriceUI, updateSubtotalPriceUI } from '../components/basket/basket-products/quantity-handlers';
import { formatPrice } from '../utils/general/price-formatter';

vi.mock('../../../api/apiService', () => ({
  updateQuantity: vi.fn(),
  getActiveCart: vi.fn(),
}));

vi.mock('../../../utils/general/price-formatter', () => ({
  formatPrice: vi.fn((price: number) => `$${(price / 100).toFixed(2)}`),
}));

vi.mock('../../header/header', () => ({
  updateBasketCounter: vi.fn(),
}));

vi.mock('../basket-pay/prices/getSubtotalPrice', () => ({
  calculateSubtotal: vi.fn(),
}));

vi.mock('../basket-pay/prices/getTotalPrice', () => ({
  fetchAndPrintTotalPrice: vi.fn(),
}));

describe('setupQuantityHandlers', () => {
  let countView: HTMLElement;
  let totalPriceElement: HTMLElement;
  let countSubtract: HTMLElement;
  let countAdd: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();

    countView = document.createElement('div');
    totalPriceElement = document.createElement('div');
    countSubtract = document.createElement('div');
    countAdd = document.createElement('div');

    countSubtract.classList.add('item-count-container__count-subtract');
    countAdd.classList.add('item-count-container__count-add');
  });

  const createMockCentPrecisionMoney = (centAmount: number): CentPrecisionMoney => ({
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount,
    fractionDigits: 2,
  });

  const createMockLineItem = (quantity: number): LineItem => ({
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
      value: createMockCentPrecisionMoney(1000),
      id: '',
    },
    totalPrice: createMockCentPrecisionMoney(2000),
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

  const updateItemQuantity = async (newCount: number): Promise<void> => {
    const mockUpdatedItem = createMockLineItem(newCount);
    vi.mocked(updateQuantity).mockResolvedValue(mockUpdatedItem);
    vi.mocked(fetchAndPrintTotalPrice).mockResolvedValue(3000);

    const mockCart = createMockCart([mockUpdatedItem]);
    vi.mocked(getActiveCart).mockResolvedValue(mockCart);
    vi.mocked(calculateSubtotal).mockReturnValue(3000);

    await setupQuantityHandlers(
      countView,
      totalPriceElement,
      countSubtract,
      countAdd,
      'lineItem1',
      newCount - 1,
      1000,
    );

    countAdd.click();
  };

  it('should update quantity and total price correctly', async () => {
    const initialQuantity = 2;
    const newQuantity = 3;
    const price = 1000;
    const mockUpdatedItem = createMockLineItem(newQuantity);

    vi.mocked(updateQuantity).mockResolvedValue(mockUpdatedItem);
    vi.mocked(fetchAndPrintTotalPrice).mockResolvedValue(3000);

    const mockCart = createMockCart([mockUpdatedItem]);
    vi.mocked(getActiveCart).mockResolvedValue(mockCart);
    vi.mocked(calculateSubtotal).mockReturnValue(3000);

    setupQuantityHandlers(
      countView,
      totalPriceElement,
      countSubtract,
      countAdd,
      'lineItem1',
      initialQuantity,
      price,
    );

    await updateItemQuantity(newQuantity);

    expect(countView.textContent).toBe(newQuantity.toString());
    expect(totalPriceElement.textContent).toBe(`Total: ${formatPrice(price * newQuantity)}`);
    expect(updateTotalPriceUI).toHaveBeenCalledWith(3000);
    expect(updateSubtotalPriceUI).toHaveBeenCalledWith(3000);
  });

  it('should hide subtract button when quantity is 1', async () => {
    const initialQuantity = 2;
    const newQuantity = 1;
    const price = 1000;
    const mockUpdatedItem = createMockLineItem(newQuantity);

    vi.mocked(updateQuantity).mockResolvedValue(mockUpdatedItem);
    vi.mocked(fetchAndPrintTotalPrice).mockResolvedValue(2000);

    const mockCart = createMockCart([mockUpdatedItem]);
    vi.mocked(getActiveCart).mockResolvedValue(mockCart);
    vi.mocked(calculateSubtotal).mockReturnValue(2000);

    setupQuantityHandlers(
      countView,
      totalPriceElement,
      countSubtract,
      countAdd,
      'lineItem1',
      initialQuantity,
      price,
    );

    await updateItemQuantity(newQuantity);

    expect(countView.textContent).toBe(newQuantity.toString());
    expect(countSubtract.classList.contains('hidden')).toBe(true);
    expect(updateTotalPriceUI).toHaveBeenCalledWith(2000);
    expect(updateSubtotalPriceUI).toHaveBeenCalledWith(2000);
  });

});
