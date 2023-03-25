import { createSignal } from "solid-js";
import { Video } from "../types/types";

const [videos, setVideos] = createSignal<Video[]>([]);

export const getVideos = () => videos();

export const addVideo = (video: Video) => {
  setVideos([...videos(), video]);
};

export const removeVideo = (id: Video["id"]) => {
  setVideos([...videos().filter((video) => video.id !== id)]);
};
