/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHOPIFY_STORE_DOMAIN: string;
    readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string;
    readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
