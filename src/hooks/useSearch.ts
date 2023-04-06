import { createSignal } from "solid-js";
import { initGoogleScript, loadGoogleScript } from "../scripts/script";
import { getVideos } from "../store/videos";
import {
  getSearchState,
  setApiData,
  setError,
  setCurrentWord,
  setAllSearchState,
} from "../store/search";
import type { GapiWindow, Video } from "../types/types";

export const useSearch = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const state = () => getSearchState();

  const initApi = () => {
    (window as GapiWindow).onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      setGapi(_gapi);
    };

    if (!gapi()) {
      (window as GapiWindow).onGoogleScriptLoad();
    }

    loadGoogleScript();
  };

  const searchVideo = async (q: string, pageToken: string = "") => {
    if (q === "") {
      setAllSearchState({
        resultVideos: [],
        total: 0,
        nextPageToken: "",
        currentWord: "",
        inputValue: "",
        error: "検索ワードが入力されていません。",
      });
      return;
    }
    initGoogleScript(gapi(), () => {
      gapi()
        .client.youtube.search.list({
          q,
          part: "snippet",
          type: "video",
          pageToken,
          videoEmbeddable: true,
          maxResults: 12,
        })
        .then((data: any) => {
          const {
            nextPageToken,
            items,
            pageInfo: { totalResults },
          } = data.result;

          const stockedIds = getVideos().map((video) => video.youtube_id);

          const newVideos: Video[] = items.map((item: any) => {
            const {
              id: { videoId: youtube_id },
              snippet: { thumbnails, title, publishedAt: published_at },
            } = item;
            return {
              youtube_id,
              title,
              published_at,
              thumbnail: thumbnails.high.url,
              isStocked: stockedIds.includes(youtube_id),
            };
          });

          setApiData({
            resultVideos:
              q === state().currentWord
                ? [...state().resultVideos, ...newVideos]
                : newVideos,
            total: totalResults,
            nextPageToken: nextPageToken || "",
          });

          if (q !== state().currentWord) {
            setCurrentWord(state().inputValue);
          }

          if (!newVideos.length) {
            setError("該当する動画がありません。");
          } else {
            setError("");
          }
        });
    }).catch((error) => {
      setError(error.message);
    });
  };

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(state().inputValue);
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(state().currentWord, state().nextPageToken);
  };

  return {
    initApi,
    submitQuery,
    onClickMore,
  };
};
