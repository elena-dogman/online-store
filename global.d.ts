interface ImportMetaEnv {
  VITE_CTP_PROJECT_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

declare global {
  const importMeta: ImportMeta;
}

export { type ImportMeta };