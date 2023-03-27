import { getResultVideos, setResultVideo } from "../store/search";
import { getVideos } from "../store/videos";

export const useCommon = () => {
  const observeSearchStockedVideo = () => {
    const stockedVideoIds = () => getVideos().map((video) => video.youtubeId);
    const searchedVideos = () => getResultVideos();
    const resultVideos = searchedVideos().map((video) => {
      const isStocked = stockedVideoIds().includes(video.youtubeId);
      return { ...video, isStocked };
    });
    setResultVideo(resultVideos);
  };

  return { observeSearchStockedVideo };
};
