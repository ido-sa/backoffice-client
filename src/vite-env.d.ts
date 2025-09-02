/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface RequestInit {
  method?: string
  headers?: Record<string, string>
  body?: string
}
