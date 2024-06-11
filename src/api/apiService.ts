import {
  ctpClient,
  anonymousCtpClient,
  createRefreshTokenClient,
  createPasswordFlowClient,
} from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  Project,
  CustomerSignInResult,
  Customer,
  CustomerDraft,
  ProductProjectionPagedQueryResponse,
  Product,
  ProductProjection,
  CategoryPagedQueryResponse,
  Category,
  MyCustomerUpdateAction,
  ProductProjectionPagedSearchResponse,
  QueryParam,
  CustomerChangePassword,
  Cart,
  LineItemDraft,
  ByProjectKeyRequestBuilder,
  CartAddLineItemAction,
  CartUpdate,
  LineItem,
  CartChangeLineItemQuantityAction,
  CartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
import router from '../router/router';
import { appEvents } from '../utils/general/eventEmitter';
import { RegistrationData } from '../components/registrationForm/regDataInterface';
import { showToast } from '../components/toast/toast';
import { isCustomError } from '../utils/general/customError';
import { resultPasswordModal } from '../components/profileComponents/password/passwordModalForm';
import { RoutePaths } from '../types/types';

interface SearchQueryArgs {
  'text.en-US': string;
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  [key: string]: QueryParam;
}

export interface CustomerUpdateBody {
  version: number;
  actions: MyCustomerUpdateAction[];
}
export async function updateCustomer(bodya: CustomerUpdateBody): Promise<void> {
  const unparsedToken = localStorage.getItem('token');
  if (!unparsedToken) {
    throw new Error('No token found in local storage');
  }
  const token = JSON.parse(unparsedToken);
  const refreshToken = token.refreshToken;
  const refreshFlowClient = createApiBuilderFromCtpClient(
    createRefreshTokenClient(refreshToken),
  ).withProjectKey({ projectKey: import.meta.env.VITE_CTP_PROJECT_KEY });
  try {
    await refreshFlowClient.me().post({ body: bodya }).execute();
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
  }
}
export async function changePassword(
  dataCustomer: Customer,
  customerPassword: CustomerChangePassword,
): Promise<void> {
  const unparsedToken = localStorage.getItem('token');
  if (!unparsedToken) {
    throw new Error('No token found in local storage');
  }
  const token = JSON.parse(unparsedToken);
  const refreshToken = token.refreshToken;
  const refreshFlowClient = createApiBuilderFromCtpClient(
    createRefreshTokenClient(refreshToken),
  ).withProjectKey({ projectKey: import.meta.env.VITE_CTP_PROJECT_KEY });
  try {
    const body = {
      email: dataCustomer.email,
      password: customerPassword.newPassword,
    };
    await refreshFlowClient
      .me()
      .password()
      .post({ body: customerPassword })
      .execute();
    localStorage.removeItem('token');
    await loginStayUser(body);
    resultPasswordModal('Password is changed');
  } catch (error: unknown) {
    resultPasswordModal(
      'Error: The entered password does not match the current one',
    );
  }
}
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

const anonymousApiRoot = createApiBuilderFromCtpClient(
  anonymousCtpClient,
).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

export const getProject = (): Promise<ClientResponse<Project>> => {
  return anonymousApiRoot.get().execute();
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult> | undefined | unknown> => {
  try {
    const passFlowClient = createApiBuilderFromCtpClient(
      createPasswordFlowClient({ email: body.email, password: body.password }),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
    const data = await passFlowClient.login().post({ body }).execute();

    localStorage.setItem('userId', data.body.customer.id);

    router.navigate(RoutePaths.Main);
    appEvents.emit('login', undefined);
    return data;
  } catch (error: unknown) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    throw error;
  }
};

export const loginStayUser = async (body: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult> | undefined | unknown> => {
  try {
    const passFlowClient = createApiBuilderFromCtpClient(
      createPasswordFlowClient({ email: body.email, password: body.password }),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
    const data = await passFlowClient.login().post({ body }).execute();
    return data;
  } catch (error: unknown) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    localStorage.removeItem('token');
    await anonymousApiRoot.get().execute();
    router.navigate(RoutePaths.Login);
    appEvents.emit('logout', undefined);
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
  }
};
export const logoutUserPassword = async (): Promise<void> => {
  try {
    localStorage.removeItem('token');
    await anonymousApiRoot.get().execute();
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
  }
};
export async function isUserLogined(): Promise<ClientResponse<Customer> | void> {
  if (localStorage.getItem('token')) {
    const unparsedToken = JSON.parse(localStorage.getItem('token') as string);
    const currentPath = window.location.pathname;
    const refreshToken = unparsedToken.refreshToken;
    const refreshFlowClient = createApiBuilderFromCtpClient(
      createRefreshTokenClient(refreshToken),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
    try {
      const userData = await refreshFlowClient.me().get().execute();
      if (currentPath === RoutePaths.Main || currentPath === RoutePaths.Login) {
        router.navigate(RoutePaths.Main);
      }
      appEvents.emit('login', undefined);
      return userData;
    } catch (error) {
      router.navigate(RoutePaths.Login);
    }
  } else {
    await getProject();
  }
}

export async function getUserData(): Promise<Customer> {
  if (localStorage.getItem('token')) {
    const unparsedToken = JSON.parse(localStorage.getItem('token') as string);
    const refreshToken = unparsedToken.refreshToken;
    const refreshFlowClient = createApiBuilderFromCtpClient(
      createRefreshTokenClient(refreshToken),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });

    try {
      const response = await refreshFlowClient.me().get().execute();
      if (!response.body) {
        throw new Error('No user data found');
      }
      const userData: Customer = response.body;
      return userData;
    } catch (error: unknown) {
      if (isCustomError(error)) {
        showToast(error.body.message);
      } else if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast('An unknown error occurred');
      }
      throw error;
    }
  } else {
    throw new Error('No token found');
  }
}

export function checkLoginStatus(): boolean {
  return Boolean(localStorage.getItem('token'));
}

export async function regUser(
  regData: RegistrationData,
): Promise<ClientResponse<CustomerSignInResult> | undefined> {
  try {
    const addresses = [
      {
        key: 'Shipping-Address',
        city: regData.shippingAddress.city,
        country: regData.shippingAddress.country,
        postalCode: regData.shippingAddress.postaCode,
        streetName: regData.shippingAddress.streetName,
      },
      {
        key: 'Billing-Address',
        city: regData.billingAddress.city,
        country: regData.billingAddress.country,
        postalCode: regData.billingAddress.postaCode,
        streetName: regData.billingAddress.streetName,
      },
    ];

    const requestBody: CustomerDraft = {
      email: regData.mailValue,
      firstName: regData.name,
      lastName: regData.lastName,
      password: regData.password,
      dateOfBirth: regData.DOB,
      addresses: addresses,
      ...(regData.shippingAddress.isDefault
        ? { defaultShippingAddress: 0 }
        : {}),
      ...(regData.billingAddress.isDefault ? { defaultBillingAddress: 1 } : {}),
    };

    await apiRoot
      .customers()
      .post({
        body: requestBody,
      })
      .execute();

    await loginUser({
      email: regData.mailValue,
      password: regData.password,
    });
  } catch (error: unknown) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return undefined;
  }
}
export async function getDetailedProduct(ID: string): Promise<
  | {
      productResponse: ClientResponse<Product>;
      categoryResponses: ClientResponse<Category>[];
    }
  | undefined
> {
  try {
    const response = await apiRoot.products().withId({ ID }).get().execute();
    const categories = response.body.masterData.current.categories;
    const categoryIds = categories.map((category) => category.id);

    const categoryPromises = categoryIds.map((categoryID) =>
      apiRoot.categories().withId({ ID: categoryID }).get().execute(),
    );

    const categoryResponses = await Promise.all(categoryPromises);
    return { productResponse: response, categoryResponses: categoryResponses };
  } catch (error: unknown) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return undefined;
  }
}

export async function fetchProducts(
  sort?: string,
): Promise<ProductProjection[]> {
  try {
    let offset = 0;
    const limit = 500;
    let allProducts: ProductProjection[] = [];
    let hasMore = true;

    const queryArgs: {
      limit: number;
      offset: number;
      sort?: string[];
    } = {
      limit,
      offset,
    };

    if (sort) {
      queryArgs.sort = [sort];
    }

    while (hasMore) {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> =
        await apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: queryArgs as unknown as {
              [key: string]: string | string[] | number;
            },
          })
          .execute();

      if (response.body.results.length === 0) {
        hasMore = false;
      } else {
        allProducts = allProducts.concat(response.body.results);
        offset += limit;
        if (response.body.results.length < limit) {
          hasMore = false;
        }
      }
    }

    return allProducts;
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return [];
  }
}

export async function fetchProductAttributes(): Promise<number[] | null> {
  try {
    let offset = 0;
    const limit = 500;
    let allProducts: ProductProjection[] = [];
    let hasMore = true;

    while (hasMore) {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> =
        await apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              limit,
              offset,
            },
          })
          .execute();

      if (response.body.results.length === 0) {
        hasMore = false;
      } else {
        allProducts = allProducts.concat(response.body.results);
        offset += limit;
        if (response.body.results.length < limit) {
          hasMore = false;
        }
      }
    }

    if (allProducts.length === 0) {
      return null;
    }

    const sizes: Set<number> = new Set();

    allProducts.forEach((product) => {
      product.masterVariant.attributes?.forEach((attribute) => {
        if (attribute.name === 'size') {
          const sizeValue = Array.isArray(attribute.value)
            ? attribute.value[0]
            : attribute.value;
          sizes.add(sizeValue as number);
        }
      });

      product.variants.forEach((variant) => {
        variant.attributes?.forEach((attribute) => {
          if (attribute.name === 'size') {
            const sizeValue = Array.isArray(attribute.value)
              ? attribute.value[0]
              : attribute.value;
            sizes.add(sizeValue as number);
          }
        });
      });
    });

    const uniqueSizes = Array.from(sizes).sort((a, b) => a - b);

    return uniqueSizes;
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return null;
  }
}

export async function fetchSizesForCategory(
  categoryId: string,
): Promise<number[]> {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `categories.id: subtree("${categoryId}")`,
          limit: 500,
        },
      })
      .execute();

    const products = response.body.results;
    const sizes: Set<number> = new Set();

    products.forEach((product) => {
      product.masterVariant.attributes?.forEach((attribute) => {
        if (attribute.name === 'size') {
          const sizeValue = Array.isArray(attribute.value)
            ? attribute.value[0]
            : attribute.value;
          sizes.add(sizeValue as number);
        }
      });

      product.variants.forEach((variant) => {
        variant.attributes?.forEach((attribute) => {
          if (attribute.name === 'size') {
            const sizeValue = Array.isArray(attribute.value)
              ? attribute.value[0]
              : attribute.value;
            sizes.add(sizeValue as number);
          }
        });
      });
    });

    return Array.from(sizes).sort((a, b) => a - b);
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response: ClientResponse<CategoryPagedQueryResponse> =
      await anonymousApiRoot.categories().get().execute();

    const categories = response.body.results;

    return categories;
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return [];
  }
}

export async function fetchFilteredProducts(
  filters: string[],
  sort?: string,
): Promise<ProductProjection[]> {
  try {
    const queryArgs: {
      filter: string[];
      sort?: string[];
      limit?: number;
      offset?: number;
    } = {
      filter: filters,
    };

    if (sort) {
      queryArgs.sort = [sort];
    }

    const response: ClientResponse<ProductProjectionPagedQueryResponse> =
      await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: queryArgs as unknown as {
            [key: string]: string | string[];
          },
        })
        .execute();

    return response.body.results;
  } catch (error) {
    if (isCustomError(error)) {
      showToast(error.body.message);
    } else if (error instanceof Error) {
      showToast(error.message);
    } else {
      showToast('An unknown error occurred');
    }
    return [];
  }
}

export async function searchProducts(
  searchText: string,
): Promise<ProductProjectionPagedSearchResponse> {
  try {
    const queryArgs: SearchQueryArgs = {
      'text.en-US': searchText,
      fuzzy: true,
    };

    const response = await apiRoot
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error during product search:', error);
    throw error;
  }
}

export const getUserApiRoot = (): ByProjectKeyRequestBuilder => {
  const token = localStorage.getItem('token');
  if (token) {
    const { refreshToken } = JSON.parse(token);
    return createApiBuilderFromCtpClient(
      createRefreshTokenClient(refreshToken),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
  }
  return anonymousApiRoot;
};

export async function addToCart(
  productId: string,
  variantId: number,
  quantity: number = 1,
): Promise<ClientResponse<Cart>> {
  const api = getUserApiRoot();
  const cart = await getOrCreateCart(api);
  return addProductToCart(
    api,
    cart.body.id,
    cart.body.version,
    productId,
    variantId,
    quantity,
  );
}

async function getOrCreateCart(
  api: ByProjectKeyRequestBuilder,
): Promise<ClientResponse<Cart>> {
  try {
    return await api.me().activeCart().get().execute();
  } catch (error) {
    const cartDraft = {
      currency: 'USD',
    };
    return await api.me().carts().post({ body: cartDraft }).execute();
  }
}

async function addProductToCart(
  api: ByProjectKeyRequestBuilder,
  cartId: string,
  cartVersion: number,
  productId: string,
  variantId: number,
  quantity: number,
): Promise<ClientResponse<Cart>> {
  const lineItemDraft: LineItemDraft = {
    productId,
    variantId,
    quantity,
  };

  const cartUpdate: CartUpdate = {
    version: cartVersion,
    actions: [
      {
        action: 'addLineItem',
        ...lineItemDraft,
      } as CartAddLineItemAction,
    ],
  };

  return api
    .carts()
    .withId({ ID: cartId })
    .post({
      body: cartUpdate,
    })
    .execute();
}

export async function fetchCartItems(): Promise<LineItem[]> {
  const api = getUserApiRoot();
  const response: ClientResponse<Cart> = await api
    .me()
    .activeCart()
    .get()
    .execute();
  return response.body.lineItems;
}

export async function updateQuantity(lineItemId: string, quantity: number): Promise<LineItem | null> {
  const api = getUserApiRoot();
  try {
    const cartResponse: ClientResponse<Cart> = await api.me().activeCart().get().execute();
    const cart = cartResponse.body;

    const updateAction: CartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    };

    const cartUpdate: CartUpdate = {
      version: cart.version,
      actions: [updateAction],
    };

    const updatedCart: ClientResponse<Cart> = await api.carts().withId({ ID: cart.id }).post({
      body: cartUpdate,
    }).execute();

    const updatedLineItem = updatedCart.body.lineItems.find(item => item.id === lineItemId);
    if (!updatedLineItem) {
      return null;
    }

    return updatedLineItem;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return null;
  }
}

export async function removeItemFromCart(itemId: string): Promise<boolean> {
  const api = getUserApiRoot();
  try {
    const cart = await api.me().activeCart().get().execute();

    if (cart.body) {
      const cartId = cart.body.id;
      const cartVersion = cart.body.version;

      const cartUpdate: CartUpdate = {
        version: cartVersion,
        actions: [{
          action: 'removeLineItem',
          lineItemId: itemId,
        } as CartRemoveLineItemAction],
      };

      await api.carts().withId({ ID: cartId }).post({ body: cartUpdate }).execute();
      return true;
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }

  return false;
}