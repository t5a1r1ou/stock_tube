import { searchStateStore, videosStore } from "../store/";

export const useCommon = () => {
  const observeSearchStockedVideo = () => {
    const stockedVideoIds = () =>
      videosStore.data.map((video) => video.youtube_id);
    const resultVideos = searchStateStore.data.resultVideos.map((video) => {
      const isStocked = stockedVideoIds().includes(video.youtube_id);
      return { ...video, isStocked };
    });
    searchStateStore.setResultVideo(resultVideos);
  };

  return { observeSearchStockedVideo };
};
