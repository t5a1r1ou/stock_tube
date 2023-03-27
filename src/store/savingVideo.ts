import { createStore } from "solid-js/store";
import { Video } from "../types/types";

const [savingVideo, setSavingVideo] = createStore<Video>({
  youtubeId: "",
  title: "",
  thumbnail: "",
  folder: "",
  publishedAt: "",
  isStocked: true,
});

export const getSavingVideo = () => savingVideo;

export const setSavingVideoInfo = (video: Video) => {
  setSavingVideo({
    ...savingVideo,
    youtubeId: video.youtubeId,
    title: video.title,
    thumbnail: video.thumbnail,
    publishedAt: video.publishedAt,
  });
};

export const setSavingVideoFolder = (folder: string) => {
  setSavingVideo({
    ...savingVideo,
    folder,
  });
};
