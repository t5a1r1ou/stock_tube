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

export type SearchState = {
  resultVideos: Video[];
  total: Number;
  nextPageToken: string;
  currentWord: string;
  inputValue: string;
  error: string;
};

export type Video = {
  youtubeId: string;
  // id?: string;
  createdAt?: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
  isStocked: boolean;
  folder?: string;
};

export type Folder = {
  id: string;
  name: string;
  icon: string;
};
