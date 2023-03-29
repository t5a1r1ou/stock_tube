import { createStore } from "solid-js/store";
import { Video } from "../types/types";

const [videos, setVideos] = createStore<Video[]>([]);

export const getVideos = () => videos;

export const addVideo = (video: Video) => {
  setVideos([...videos, video]);
};

export const removeVideo = (youtubeId: Video["youtube_id"]) => {
  setVideos([...videos.filter((video) => video.youtube_id !== youtubeId)]);
};
