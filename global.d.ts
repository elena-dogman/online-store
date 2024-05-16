declare global {
  interface Global {
    window: Window & typeof globalThis;
    document: Document;
    navigator: Navigator;
    importMeta: {
      env: {
        VITE_CTP_PROJECT_KEY: string;
      };
    };
  }

  namespace NodeJS {
    interface Global extends Global {}
  }

  let window: Window & typeof globalThis;
  let document: Document;
  let navigator: Navigator;
  let importMeta: {
    env: {
      VITE_CTP_PROJECT_KEY: string;
    };
  };
}

export {};
