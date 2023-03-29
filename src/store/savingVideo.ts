import { createStore } from "solid-js/store";
import { Video } from "../types/types";

const [savingVideo, setSavingVideo] = createStore<Video>({
  youtube_id: "",
  title: "",
  thumbnail: "",
  folder_id: "",
  published_at: "",
  is_stocked: true,
});

export const getSavingVideo = () => savingVideo;

export const setSavingVideoInfo = (video: Video) => {
  setSavingVideo({
    ...savingVideo,
    youtube_id: video.youtube_id,
    title: video.title,
    thumbnail: video.thumbnail,
    published_at: video.published_at,
  });
};

export const setSavingVideoFolder = (folder_id: string) => {
  setSavingVideo({
    ...savingVideo,
    folder_id,
  });
};
