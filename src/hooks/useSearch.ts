import { Setter, createSignal } from "solid-js";
import { initGoogleScript, loadGoogleScript } from "../scripts/api";
import { getYoutubeIdFromUrl } from "../scripts/util";
import { searchStateStore } from "../store";
import type { GapiWindow, SearchState, Video } from "../types/types";

type fetchYoutubeSearchApiResult = Pick<
  SearchState,
  "nextPageToken" | "total"
> & { youtubeIds: Video["youtube_id"][] };

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

  const fetchYoutubeIds: (
    q: string,
    pageToken: string
  ) => Promise<fetchYoutubeSearchApiResult> = async (q, pageToken) => {
    const data = await gapi().client.youtube.search.list({
      q,
      part: "id",
      type: "video",
      pageToken,
      videoEmbeddable: true,
      maxResults: 12,
    });
    const {
      nextPageToken,
      items,
      pageInfo: { totalResults: total },
    } = data.result;

    const youtubeIds: Video["youtube_id"][] = items.map(
      (item: { id: { videoId: string } }) => item.id.videoId
    );

    return {
      youtubeIds,
      nextPageToken,
      total,
    };
  };

  const fetchVideoDetails: (
    youtubeId: Video["youtube_id"]
  ) => Promise<Video> = async (youtubeId) => {
    try {
      const data = await gapi().client.youtube.videos.list({
        part: ["snippet", "contentDetails"],
        id: youtubeId,
      });
      const {
        id: youtube_id,
        snippet: { thumbnails, title, publishedAt: published_at },
        contentDetails: { duration },
      } = data.result.items[0];
      return {
        youtube_id,
        title,
        published_at,
        thumbnail: thumbnails.high.url,
        duration,
      };
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const fetchResults = async (youtubeIds: Video["youtube_id"][]) => {
    try {
      const promises = youtubeIds.map((youtubeId) =>
        fetchVideoDetails(youtubeId)
      );
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const searchByUrl = (url: string) => {
    const youtubeId = getYoutubeIdFromUrl(url);
    if (youtubeId) {
      fetchVideoDetails(youtubeId)
        .then((video) => {
          searchStateStore.setApiData({
            resultVideos: [video],
            total: 1,
            nextPageToken: "",
          });
          searchStateStore.setCurrentWord("");
          searchStateStore.setError("");
        })
        .catch(() => {
          searchStateStore.setError("URLが正しいかご確認ください");
        });
    } else {
      searchStateStore.setError("URLの形式が正しくありません");
    }
  };

  const searchByKeyword = (q: string, pageToken: string) => {
    fetchYoutubeIds(q, pageToken).then((data: fetchYoutubeSearchApiResult) => {
      const { youtubeIds, nextPageToken, total } = data;

      fetchResults(youtubeIds).then((newVideos) => {
        searchStateStore.setApiData({
          resultVideos:
            q === searchStateStore.data.currentWord
              ? [...searchStateStore.data.resultVideos, ...newVideos]
              : newVideos,
          total,
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
    });
  };

  const searchVideo = async (
    q: string,
    pageToken: string = "",
    type: "keyword" | "url"
  ) => {
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
      if (type === "url") {
        searchByUrl(q);
      } else {
        searchByKeyword(q, pageToken);
      }
      setLoading(false);
    }).catch((error) => {
      searchStateStore.setError(error.message);
    });
  };

  return {
    initApi,
    searchVideo,
  };
};
