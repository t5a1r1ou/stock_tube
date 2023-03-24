import { Component, createEffect, createSignal, For, Show } from "solid-js";
import Card from "../component/Card";
import {
  cardsWrapper,
  errorText,
  formContainer,
  heading,
  pagenation,
  pagenationButton,
  submitButton,
} from "./Index.css";
import { input } from "../styles/utility.css";
import { supabase } from "../scripts/supabase";
import { useNavigate } from "@solidjs/router";
import { initGoogleScript, loadGoogleScript } from "../scripts/googleScript";
import type { GapiWindow, Video } from "../types/types";

export const Index: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const [videos, setVideos] = createSignal<Video[]>([]);
  const [inputValue, setInputValue] = createSignal<string>("");
  const [currentWord, setCurrentWord] = createSignal<string>("");
  const [total, setTotal] = createSignal<Number>(0);
  const [nextPageToken, setNextPageToken] = createSignal<string>("");
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
    searchVideo(currentWord(), nextPageToken());
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
          if (nextPageToken) {
            setNextPageToken(nextPageToken);
          } else {
            setNextPageToken("");
          }
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
          if (!newVideos.length) {
            setError("該当する動画がありません。");
          } else {
            setError("");
          }
          if (q === currentWord()) {
            setVideos([...videos(), ...newVideos]);
          } else {
            setVideos(newVideos);
            setCurrentWord(inputValue());
          }
          setTotal(totalResults);
        });
    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div>
      <h2 class={heading}>Index</h2>
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
      <div class={cardsWrapper}>
        <Show when={currentWord() !== ""}>
          <p>
            「{currentWord()}」の検索結果:{" "}
            {total() === 1000000
              ? "100万件以上"
              : `${total().toLocaleString()}件`}
          </p>
        </Show>
        <For each={videos()}>
          {(video) => (
            <Card
              title={video.title}
              publishedAt={video.publishedAt}
              id={video.id}
              thumbnail={video.thumbnail}
            />
          )}
        </For>
      </div>
      <div class={pagenation}>
        <Show when={nextPageToken() !== ""}>
          <button onClick={(e) => onClickMore(e)} class={pagenationButton}>
            もっと見る
          </button>
        </Show>
      </div>
    </div>
  );
};
