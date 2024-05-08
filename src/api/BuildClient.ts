import {
  AuthMiddlewareOptions,
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { v4 as uuidv4 } from 'uuid';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

// настройки для авторизации авторизованных запросов
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${import.meta.env.VITE_REGION}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes: [`manage_project:${projectKey}`],
  fetch: fetch,
};

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
  .withAnonymousSessionFlow(anonymousAuthOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
