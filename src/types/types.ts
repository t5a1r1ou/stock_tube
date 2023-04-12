export type Credentials = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type AuthType = {
  flag: "signin" | "signup";
};

export type GapiWindow = Window &
  typeof globalThis & {
    onGoogleScriptLoad: () => void;
  };

export type YoutubeWindow = Window &
  typeof globalThis & {
    onYouTubeIframeAPIReady: () => void;
  };

export type SearchState = {
  resultVideos: Video[];
  total: number;
  nextPageToken: string;
  currentWord: string;
  inputValue: string;
  error: string;
};

export type Video = {
  id?: string;
  youtube_id: string;
  created_at?: string;
  thumbnail: string;
  title: string;
  duration: string;
  published_at: string;
  folder_id?: string;
  user_id?: string;
};

export type Folder = {
  id: string;
  created_at?: string;
  name: string;
  icon: string;
  url_id: string;
  user_id?: string;
};

export type SavingFolder = {
  id?: string;
  created_at?: string;
  name: string;
  icon: string;
  url_id: string;
  user_id?: string;
};
