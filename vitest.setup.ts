import { beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', { url: 'http://localhost/' });

global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

(global as typeof globalThis & {
  importMeta: {
    env: {
      VITE_CTP_PROJECT_KEY: string;
    };
  };
}).importMeta = {
  env: {
    VITE_CTP_PROJECT_KEY: 'mock_project_key',
  },
};

beforeAll(() => {
});

afterAll(() => {
  dom.window.close();
});
