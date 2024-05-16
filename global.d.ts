/* eslint-disable no-var */
declare global {
  var window: Window & typeof globalThis;
  var document: Document;
  var navigator: Navigator;
  var importMeta: {
    env: {
      VITE_CTP_PROJECT_KEY: string;
    };
  };
}

export {};