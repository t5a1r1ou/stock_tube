import { createStore } from "solid-js/store";
import { Folder, Video } from "../types/types";
import { getFolders } from "./folders";

const [videos, setVideos] = createStore<Video[]>([]);

export const getVideos = () => videos;

export const getFolderVideos = (id: Folder["id"]) =>
  videos.filter((video) => video.folder_id === id);

export const getFolderVideosFromUrl = (url_id: Folder["url_id"]) => {
  const targetFolder = getFolders().find((folder) => folder.url_id === url_id);
  if (targetFolder) {
    return videos.filter((video) => video.folder_id === targetFolder.id);
  }
  return [];
};

export const addVideo = (video: Video) => {
  setVideos([...videos, video]);
};

export const removeVideo = (youtubeId: Video["youtube_id"]) => {
  setVideos([...videos.filter((video) => video.youtube_id !== youtubeId)]);
};
