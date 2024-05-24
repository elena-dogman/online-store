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
} from '@commercetools/platform-sdk';
import router from '../router/router';
import { appEvents } from '../utils/eventEmitter';
import { RegistrationData } from '../components/registrationForm/regDataInterface';
import { showToast } from '../components/toast/toast';
import { isCustomError } from '../utils/customError';
// import { U } from 'vitest/dist/reporters-yx5ZTtEV.js';

export interface ProductAttributesResponse {
  audience: Set<string>;
  categories: Set<string>;
  prices: Set<number>;
  sizes: Set<number>;
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
    router.navigate('/');
    appEvents.emit('login', undefined);
    return data;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    localStorage.removeItem('token');
    await anonymousApiRoot.get().execute();
    router.navigate('/login');
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
      if (currentPath === '/' || currentPath === '/login') {
        router.navigate('/');
      }
      appEvents.emit('login', undefined);
      return userData;
    } catch (error) {
      router.navigate('/login');
    }
  } else {
    await getProject();
  }
}

export async function getUserData(): Promise<ClientResponse<Customer> | void> {
  if (localStorage.getItem('token')) {
    const unparsedToken = JSON.parse(localStorage.getItem('token') as string);
    const refreshToken = unparsedToken.refreshToken;
    const refreshFlowClient = createApiBuilderFromCtpClient(
      createRefreshTokenClient(refreshToken),
    ).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    });
    try {
      const userData = await refreshFlowClient.me().get().execute();
      return userData;
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
      ...(regData.shippingAddress.isDefault && { defaultShippingAddress: 0 }),
      ...(regData.billingAddress.isDefault && { defaultBillingAddress: 1 }),
    };
    await apiRoot
      .customers()
      .post({
        body: requestBody as CustomerDraft,
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

export async function getDetailedProduct(
  ID: string,
): Promise<ClientResponse<Product> | undefined> {
  try {
    const response = await apiRoot.products().withId({ ID }).get().execute();
    const productImages =
      response?.body.masterData.current.masterVariant.images;
    console.log(productImages);
    return response;
  } catch (error: unknown) {
    return undefined;
  }
}

export async function fetchProducts(): Promise<ProductProjection[]> {
  try {
    let offset = 0;
    const limit = 500;
    let allProducts: ProductProjection[] = [];
    let hasMore = true;

    while (hasMore) {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> =
        await apiRoot
          .productProjections()
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

    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductAttributes(): Promise<ProductAttributesResponse | null> {
  try {
    let offset = 0;
    const limit = 500;
    let allProducts: ProductProjection[] = [];
    let hasMore = true;

    while (hasMore) {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> = await apiRoot
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

    console.log('Products:', allProducts);

    const audience: Set<string> = new Set();
    const categories: Set<string> = new Set();
    const prices: Set<number> = new Set();
    const sizes: Set<number> = new Set();

    allProducts.forEach(product => {
      product.masterVariant.attributes?.forEach(attribute => {
        if (attribute.name === 'audience' && typeof attribute.value === 'string') {
          audience.add(attribute.value);
        }
        if (attribute.name === 'category' && typeof attribute.value === 'string') {
          categories.add(attribute.value);
        }
        if (attribute.name === 'price' && typeof attribute.value === 'object' && attribute.value.centAmount) {
          prices.add(attribute.value.centAmount);
        }
        if (attribute.name === 'size' && typeof attribute.value === 'number') {
          sizes.add(attribute.value);
        }
      });
    });

    console.log('Audience:', Array.from(audience));
    console.log('Categories:', Array.from(categories));
    console.log('Prices:', Array.from(prices));
    console.log('Sizes:', Array.from(sizes));

    return {
      audience,
      categories,
      prices,
      sizes,
    };
  } catch (error) {
    console.error('Error fetching product attributes:', error);
    return null;
  }
}

export async function fetchFilteredProducts(filters: string[]): Promise<ProductProjection[]> {
  try {
    const response: ClientResponse<ProductProjectionPagedQueryResponse> = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filters,
        },
      })
      .execute();

    return response.body.results;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    return [];
  }
}
