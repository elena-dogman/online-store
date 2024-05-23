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

export const fetchProducts = async (
  limit = 9,
  offset = 0,
): Promise<ProductProjection[]> => {
  try {
    const response: ClientResponse<ProductProjectionPagedQueryResponse> =
      await apiRoot
        .productProjections()
        .get({ queryArgs: { limit, offset } })
        .execute();

    const products: ProductProjection[] = response.body.results;

    products.forEach((product: ProductProjection) => {
      let productName = 'No name';
      let productDescription = 'No description';
      let productImage = 'No image';

      if (product.name && product.name['en-US']) {
        productName = product.name['en-US'];
      }

      if (product.description && product.description['en-US']) {
        productDescription = product.description['en-US'];
      }

      if (
        product.masterVariant.images &&
        product.masterVariant.images[0] &&
        product.masterVariant.images[0].url
      ) {
        productImage = product.masterVariant.images[0].url;
      }

      console.log(`Product Name: ${productName}`);
      console.log(`Product Description: ${productDescription}`);
      console.log(`Image URL: ${productImage}`);
      console.log('----------------------');
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
