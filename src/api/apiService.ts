import { ctpClient } from './BuildClient';
// import { showToast } from '../components/toast/toast';

import {
  // ApiRoot,
  createApiBuilderFromCtpClient,
  ClientResponse,
  Project,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
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
    console.log(data, '123');
    return data;
  } catch (error) {
    return error;
  }
};
