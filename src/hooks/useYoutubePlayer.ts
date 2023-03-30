import { YoutubeWindow } from "../types/types";
import { loadYoutubeScript } from "../scripts/script";

export const useYoutubePlayer = (id: string) => {
  let play: () => void, pause: () => void;
  const initApi = (videoId: string) => {
    loadYoutubeScript();

    (window as YoutubeWindow).onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player(id, {
        videoId,
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
        events: {
          onReady: (e) => {
            console.log(e.target);
            e.target.playVideo();
          },
        },
      });

      play = () => {
        newPlayer.playVideo();
      };

      pause = () => {
        newPlayer.pauseVideo();
      };
    };
    return { play, pause };
  };

  return { initApi };
};
