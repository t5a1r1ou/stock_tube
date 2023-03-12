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
