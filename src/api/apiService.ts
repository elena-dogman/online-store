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
} from '@commercetools/platform-sdk';
import router from '../router/router';
import { appEvents } from '../utils/eventEmitter';
import { RegistrationData } from '../components/registrationForm/regDataInterface';
// apiRoot с авторизованным клиентом
//УДАЛИТЬ СТРОКУ НИЖУ ПОСЛЕ ПЕРВОГО ЮЗА В КОДЕ
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

// apiRoot с анонимным клиентом
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
    const response = await anonymousApiRoot.get().execute();
    console.log('Switched to anonymous mode:', response);
    router.navigate('/login');
    appEvents.emit('logout', undefined);
  } catch (error) {
    console.error('Logout failed', error);
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
    console.log('Switched to anonymous mode');
  }
}

export function checkLoginStatus(): boolean {
  return Boolean(localStorage.getItem('token'));
}
///reg
export async function regUser(regData: RegistrationData): Promise<void> {
  try {
    const requestBody: CustomerDraft = {
      email: regData.mailValue,
      firstName: regData.name,
      lastName: regData.lastName,
      password: regData.password,
      dateOfBirth: regData.DOB,
      addresses: [
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
      ],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };
    // const editedBody = JSON.stringify(requestBody)
    const response = await apiRoot
      .customers()
      .post({
        body: requestBody as CustomerDraft,
      })
      .execute();
    console.log(response);
    const loginResponse = await loginUser({
      email: regData.mailValue,
      password: regData.password,
    });
    console.log(loginResponse);
  } catch (error) {
    console.log(error);
  }
}
