import { Component, createEffect, createSignal, Show } from "solid-js";
import {
  errorText,
  formContainer,
  heading,
  pagenation,
  pagenationButton,
  searchResult,
  submitButton,
} from "./Search.css";
import { input } from "../styles/utility.css";
import { supabase } from "../scripts/supabase";
import { useNavigate } from "@solidjs/router";
import { initGoogleScript, loadGoogleScript } from "../scripts/googleScript";
import type { GapiWindow, Video, ApiData } from "../types/types";
import { CardsWrapper } from "../component/CardsWrapper";

export const Search: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const [inputValue, setInputValue] = createSignal<string>("");
  const [apiData, setApiData] = createSignal<ApiData>({
    videos: [],
    total: 0,
    nextPageToken: "",
  });
  const [currentWord, setCurrentWord] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");

  const navigate = useNavigate();

  createEffect(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw Error;
    }
    if (!data.session?.user) {
      navigate("/signin");
    } else {
      (window as GapiWindow).onGoogleScriptLoad = () => {
        const _gapi = window.gapi;
        setGapi(_gapi);
      };

      loadGoogleScript();
    }
  }, []);

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(inputValue());
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(currentWord(), apiData().nextPageToken);
  };

  const searchVideo = async (q: string, pageToken: string = "") => {
    if (q === "") {
      setError("検索ワードが入力されていません。");
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
            };
          });

          setApiData({
            videos:
              q === currentWord()
                ? [...apiData().videos, ...newVideos]
                : newVideos,
            total: totalResults,
            nextPageToken: nextPageToken || "",
          });

          if (q !== currentWord()) {
            setCurrentWord(inputValue());
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

  return (
    <div>
      <h2 class={heading}>検索</h2>
      <form onSubmit={(e) => submitQuery(e)} class={formContainer}>
        <input
          type="text"
          class={input}
          value={inputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="検索ワードを入力"
        />
        <button type="submit" class={submitButton}>
          検索
        </button>
      </form>
      <Show when={error() !== ""}>
        <p class={errorText}>{error()}</p>
      </Show>
      <Show when={currentWord() !== ""}>
        <p class={searchResult}>
          「{currentWord()}」の検索結果:{" "}
          {apiData().total === 1000000
            ? "100万件以上"
            : `${apiData().total.toLocaleString()}件`}
        </p>
      </Show>
      <CardsWrapper videos={apiData().videos} />
      <div class={pagenation}>
        <Show when={apiData().nextPageToken !== ""}>
          <button onClick={(e) => onClickMore(e)} class={pagenationButton}>
            もっと見る
          </button>
        </Show>
      </div>
    </div>
  );
};
