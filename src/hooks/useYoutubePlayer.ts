import { YoutubeWindow } from "../types/types";
import { loadYoutubeScript } from "../scripts/script";
import { setYoutubePlayer } from "../store/player";

export const useYoutubePlayer = (id: string) => {
  const initApi = () => {
    loadYoutubeScript();

    (window as YoutubeWindow).onYouTubeIframeAPIReady = () => {
      const player = new YT.Player(id, {
        height: "100%",
        width: "100%",
        playerVars: {
          controls: 1,
          autoplay: 0,
          disablekb: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          playsinline: 1,
          rel: 0,
          autohide: 0,
        },
      });
      setYoutubePlayer(player);
    };
  };

  return { initApi };
};
