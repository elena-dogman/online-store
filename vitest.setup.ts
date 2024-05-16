import { beforeAll, afterAll } from 'vitest';
import { JSDOM } from 'jsdom';

// Настройка jsdom
const dom = new JSDOM('', { url: 'http://localhost/' });

global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

global.importMeta = {
  env: {
    VITE_CTP_PROJECT_KEY: 'mock_project_key',
  },
};

beforeAll(() => {
  // Дополнительная настройка перед всеми тестами
});

afterAll(() => {
  // Очистка после всех тестов
  dom.window.close();
});
