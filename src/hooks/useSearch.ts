import { useNavigate } from "@solidjs/router";
import { Accessor, Setter } from "solid-js";
import { initGoogleScript, loadGoogleScript } from "../scripts/googleScript";
import { supabase } from "../scripts/supabase";
import { GapiWindow, Video } from "../types/types";
import { getVideos } from "../store/videos";
import {
  getSearchState,
  setApiData,
  setError,
  setCurrentWord,
  setAllSearchState,
} from "../store/search";

type Props = {
  gapi: Accessor<any>;
  setGapi: Setter<any>;
};

export const useSearch = (props: Props) => {
  const navigate = useNavigate();

  const state = () => getSearchState();

  const initAuthAndApi = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw Error;
    }
    if (!data.session?.user) {
      navigate("/signin");
    } else {
      (window as GapiWindow).onGoogleScriptLoad = () => {
        const _gapi = window.gapi;
        props.setGapi(_gapi);
      };

      if (!props.gapi()) {
        (window as GapiWindow).onGoogleScriptLoad();
      }

      loadGoogleScript();
    }
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
    initGoogleScript(props.gapi(), () => {
      props
        .gapi()
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

          const stockedIds = getVideos().map((video) => video.id);

          const newVideos: Video[] = items.map((item: any) => {
            const {
              id: { videoId: id },
              snippet: { thumbnails, title, publishedAt },
            } = item;
            return {
              id,
              title,
              publishedAt,
              thumbnail: thumbnails.high.url,
              isStocked: stockedIds.includes(id),
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
    initAuthAndApi,
    submitQuery,
    onClickMore,
  };
};
