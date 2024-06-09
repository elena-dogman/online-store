import {
  ctpClient,
} from './BuildClient';
import {
  ClientResponse,
  Cart,
  MyCartDraft,
  MyLineItemDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { showToast } from '../components/toast/toast';
import { isCustomError } from '../utils/general/customError';


const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});


export async function createCart(): Promise<ClientResponse<Cart>> {
  try {
    const cartDraft: MyCartDraft = {
      currency: 'USD',
    };

    const response = await apiRoot.me().carts().post({
      body: cartDraft,
    }).execute();

    return response;
  } catch (error: unknown) {
    handleApiError(error);
    throw error;
  }
}

export async function addToCart(
  cartId: string,
  productId: string,
  variantId: number,
  quantity: number,
): Promise<ClientResponse<Cart>> {
  try {
    const lineItem: MyLineItemDraft = {
      productId,
      variantId,
      quantity,
    };

    const response = await apiRoot.me().carts().withId({ ID: cartId }).post({
      body: {
        actions: [{
          action: 'addLineItem',
          productId: lineItem.productId,
          variantId: lineItem.variantId,
          quantity: lineItem.quantity,
        }],
        version: 0,
      },
    }).execute();

    return response;
  } catch (error: unknown) {
    handleApiError(error);
    throw error;
  }
}

export async function getActiveCart(): Promise<ClientResponse<Cart> | undefined> {
  try {
    const response = await apiRoot.me().activeCart().get().execute();
    return response;
  } catch (error: unknown) {
    if (isApiNotFoundError(error)) {
      return undefined;
    } else {
      handleApiError(error);
      return undefined;
    }
  }
}

export async function handleAddToCart(productId: string, variantId: number, quantity: number): Promise<void> {
  try {
    const cart = await getActiveCart();
    if (!cart) {
      const newCart = await createCart();
      await addToCart(newCart.body.id, productId, variantId, quantity);
    } else {
      await addToCart(cart.body.id, productId, variantId, quantity);
    }
    showToast('Product added to cart successfully');
  } catch (error: unknown) {
    handleApiError(error);
  }
}

function handleApiError(error: unknown): void {
  if (isCustomError(error)) {
    const customError = error.body as { statusCode?: number; message: string };
    if (customError.statusCode) {
      showToast(`Error ${customError.statusCode}: ${customError.message}`);
    } else {
      showToast(customError.message);
    }
  } else if (error instanceof Error) {
    showToast(error.message);
  } else {
    showToast('An unknown error occurred');
  }
}

function isApiNotFoundError(error: unknown): boolean {
  if (isCustomError(error)) {
    const customError = error.body as { statusCode?: number; message: string };
    return customError.statusCode === 404;
  }
  return false;
}
