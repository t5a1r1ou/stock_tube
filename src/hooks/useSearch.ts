import { useNavigate } from "@solidjs/router";
import { Accessor, Setter } from "solid-js";
import { initGoogleScript, loadGoogleScript } from "../scripts/googleScript";
import { supabase } from "../scripts/supabase";
import { ApiData, GapiWindow, Video } from "../types/types";
import { getVideos } from "../store/store";

type Props = {
  gapi: Accessor<any>;
  setGapi: Setter<any>;
  apiData: Accessor<ApiData>;
  setApiData: Setter<ApiData>;
  currentWord: Accessor<string>;
  setCurrentWord: Setter<string>;
  setError: Setter<string>;
  inputValue: Accessor<string>;
};

export const useSearch = (props: Props) => {
  const navigate = useNavigate();

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
      props.setError("検索ワードが入力されていません。");
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

          props.setApiData({
            resultVideos:
              q === props.currentWord()
                ? [...props.apiData().resultVideos, ...newVideos]
                : newVideos,
            total: totalResults,
            nextPageToken: nextPageToken || "",
          });

          if (q !== props.currentWord()) {
            props.setCurrentWord(props.inputValue());
          }

          if (!newVideos.length) {
            props.setError("該当する動画がありません。");
          } else {
            props.setError("");
          }
        });
    }).catch((error) => {
      props.setError(error.message);
    });
  };

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(props.inputValue());
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(props.currentWord(), props.apiData().nextPageToken);
  };

  const observeSearchStockedVideo = (id: string) => {
    const stockedVideos = props.apiData().resultVideos.map((video) => {
      if (video.id === id) {
        return { ...video, isStocked: true };
      } else {
        return video;
      }
    });
    props.setApiData({ ...props.apiData(), resultVideos: stockedVideos });
  };

  return {
    initAuthAndApi,
    submitQuery,
    onClickMore,
    observeSearchStockedVideo,
  };
};
