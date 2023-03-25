import { createSignal } from "solid-js";
import { Video } from "../types/types";

const [videos, setVideos] = createSignal<Video[]>([]);

export const getVideos = () => videos();

export const onClickAdd = (video: Video) => {
  setVideos([...videos(), video]);
};
