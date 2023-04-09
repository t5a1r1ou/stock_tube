import { Setter, createSignal } from "solid-js";
import { initGoogleScript, loadGoogleScript } from "../scripts/api";
import { searchStateStore, videosStore } from "../store";
import type { GapiWindow, Video } from "../types/types";

export const useSearch = (setLoading: Setter<boolean>) => {
  const [gapi, setGapi] = createSignal<any>(null);

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
      searchStateStore.setData({
        resultVideos: [],
        total: 0,
        nextPageToken: "",
        currentWord: "",
        inputValue: "",
        error: "検索ワードが入力されていません。",
      });
      return;
    }
    // もっと見る押下時にはスピナーを表示させない
    if (searchStateStore.data.resultVideos.length === 0) {
      setLoading(true);
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

          const stockedIds = videosStore.data.map((video) => video.youtube_id);

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

          searchStateStore.setApiData({
            resultVideos:
              q === searchStateStore.data.currentWord
                ? [...searchStateStore.data.resultVideos, ...newVideos]
                : newVideos,
            total: totalResults,
            nextPageToken: nextPageToken || "",
          });

          if (q !== searchStateStore.data.currentWord) {
            searchStateStore.setCurrentWord(searchStateStore.data.inputValue);
          }

          if (!newVideos.length) {
            searchStateStore.setError("該当する動画がありません。");
          } else {
            searchStateStore.setError("");
          }
        });
      setLoading(false);
    }).catch((error) => {
      searchStateStore.setError(error.message);
    });
  };

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(searchStateStore.data.inputValue);
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(
      searchStateStore.data.currentWord,
      searchStateStore.data.nextPageToken
    );
  };

  return {
    initApi,
    submitQuery,
    onClickMore,
  };
};
