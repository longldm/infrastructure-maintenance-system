/// <reference types="react-scripts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}