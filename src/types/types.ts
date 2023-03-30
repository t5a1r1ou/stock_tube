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
    onGoogleScriptLoad: () => void;
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
  youtube_id: string;
  created_at?: string;
  thumbnail: string;
  title: string;
  published_at: string;
  is_stocked: boolean;
  folder_id?: string;
};

export type Folder = {
  id: string;
  created_at?: string;
  name: string;
  icon: string;
};
