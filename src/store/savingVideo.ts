import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Video } from "../types/types";

const savingVideo = () => {
  const [data, setData] = createStore<Video>({
    youtube_id: "",
    title: "",
    thumbnail: "",
    duration: "",
    folder_id: "",
    published_at: "",
  });

  const clearData = () => {
    setData({
      youtube_id: "",
      title: "",
      thumbnail: "",
      duration: "",
      folder_id: "",
      published_at: "",
    });
  };

  const setInfo = (video: Video) => {
    setData({
      ...savingVideo,
      youtube_id: video.youtube_id,
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.duration,
      published_at: video.published_at,
    });
  };

  const setFolder = (folder_id: string) => {
    setData({
      ...savingVideo,
      folder_id,
    });
  };

  return { data, clearData, setInfo, setFolder };
};

export default createRoot(savingVideo);
