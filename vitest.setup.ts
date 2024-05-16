import { ImportMeta } from './global';

(globalThis as unknown as { importMeta: ImportMeta }).importMeta = {
  env: {
    VITE_CTP_PROJECT_KEY: 'mock_project_key',
  },
};
