import { ctpClient, anonymousCtpClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  Project,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import router from '../router/router';

// apiRoot с авторизованным клиентом
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

// apiRoot с анонимным клиентом
const anonymousApiRoot = createApiBuilderFromCtpClient(anonymousCtpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

export const getProject = (): Promise<ClientResponse<Project>> => {
  return apiRoot.get().execute();
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult> | undefined | unknown> => {
  try {
    const data = await apiRoot.login().post({ body }).execute();
    router.navigate('/');
    return data;
  } catch (error) {
    console.error('Login failed', error);
    return error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    // при логауте переключаемся на анонимный режим
    const response = await anonymousApiRoot.get().execute();
    console.log('Switched to anonymous mode:', response);
    router.navigate('/login'); // на логин
  } catch (error) {
    console.error('Logout failed', error);
  }
};
