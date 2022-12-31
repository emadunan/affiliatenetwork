declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    BOOSTINY_API_KEY: string;
    BOOSTINY_API_URL: string;
    NEXTAUTH_SECRET: string;
    EMAIL_SERVER: string;
    EMAIL_FROM: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}