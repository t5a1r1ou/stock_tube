import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Video } from "../types/types";

const deletingVideo = () => {
  const [data, setData] = createStore<Pick<Video, "youtube_id" | "title">>({
    youtube_id: "",
    title: "",
  });

  const clearData = () =>
    setData({
      youtube_id: "",
      title: "",
    });

  return { data, setData, clearData };
};

export default createRoot(deletingVideo);
