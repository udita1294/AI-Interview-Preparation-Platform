declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
      JWT_SECRET: string
      GOOGLE_GENAI_API_KEY: string
    }
  }
}

export {}
