import { getResultVideos, setResultVideo } from "../store/search";
import { getVideos } from "../store/videos";

export const useCommon = () => {
  const observeSearchStockedVideo = () => {
    const stockedVideoIds = () => getVideos().map((video) => video.id);
    const searchedVideos = () => getResultVideos();
    const resultVideos = searchedVideos().map((video) => {
      const isStocked = stockedVideoIds().includes(video.id);
      return { ...video, isStocked };
    });
    setResultVideo(resultVideos);
  };

  return { observeSearchStockedVideo };
};
