import {
  AuthMiddlewareOptions,
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { v4 as uuidv4 } from 'uuid';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

// настройки для авторизации авторизованных запросов
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${import.meta.env.VITE_REGION}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes: [`manage_project:${projectKey}`],
  fetch: fetch,
};
///

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${import.meta.env.VITE_REGION}.commercetools.com`,
  fetch,
};

// клиент для авторизованных запросов
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// настройки для анонимных сессий
const anonymousAuthOptions: AnonymousAuthMiddlewareOptions = {
  ...authMiddlewareOptions,
  credentials: {
    ...authMiddlewareOptions.credentials,
    anonymousId: uuidv4(), // айдишечка
  },
};

// клиент для анонимных запросов
export const anonymousCtpClient = new ClientBuilder()
  .withLoggerMiddleware()
  .withAnonymousSessionFlow(anonymousAuthOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
///

export const ctpClientCache = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export function createPasswordFlowClient(body: {
  email: string;
  password: string;
}): typeof passwordFlowClient {
  const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: `${body.email}`,
        password: `${body.password}`,
      },
    },
    scopes: [`manage_project:${projectKey}`],
    fetch: fetch,
    tokenCache: {
      get() {
        const token = JSON.parse(localStorage.getItem('token') as string);
        return token;
      },
      set(cache) {
        const token = JSON.stringify(cache);
        localStorage.setItem('token', token);
        console.log(cache, 'cache');
      },
    },
  };
  const passwordFlowClient = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return passwordFlowClient;
}
export function createRefreshTokenClient(
  refreshToken: string,
): typeof refreshTokenClient {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    refreshToken: `${refreshToken}`,
    tokenCache: {
      get() {
        const token = JSON.parse(localStorage.getItem('token') as string);
        return token;
      },
      set(cache) {
        const token = JSON.stringify(cache);
        localStorage.setItem('token', token);
        console.log(cache, 'cache');
      },
    },
    fetch: fetch,
  };
  const refreshTokenClient = new ClientBuilder()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return refreshTokenClient;
}
