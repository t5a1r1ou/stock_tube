export type Credentials = {
  email: string;
  password: string;
};

export type AuthType = {
  flag: "signin" | "signup";
};

export type User = {
  email?: string;
};

export type GapiWindow = Window &
  typeof globalThis & {
    onGoogleScriptLoad: any;
  };

export type Video = {
  id: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
};
