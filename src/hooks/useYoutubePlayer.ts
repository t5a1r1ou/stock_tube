import { loadYoutubeScript } from "../scripts/script";
import { setYoutubePlayer } from "../store/player";
import { YoutubeWindow } from "../types/types";

export const useYoutubePlayer = (id: string) => {
  const initApi = (onStateChange: (event: YT.OnStateChangeEvent) => void) => {
    loadYoutubeScript();

    (window as YoutubeWindow).onYouTubeIframeAPIReady = () => {
      const player = new YT.Player(id, {
        height: "100%",
        width: "100%",
        playerVars: {
          controls: 1,
          autoplay: 0,
          color: "white",
          enablejsapi: 1,
          iv_load_policy: 3,
          playsinline: 1,
          rel: 0,
          autohide: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange,
        },
      });
      setYoutubePlayer(player);
    };
  };

  return { initApi };
};
