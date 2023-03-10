import { Component, createEffect, createSignal, For, Show } from "solid-js";
import Card from "../component/Card";
import {
  cardsWrapper,
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
import type { GapiWindow } from "../types/types";

type Video = {
  id: string;
};

export const Index: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const [videos, setVideos] = createSignal<Video[]>([]);
  const [inputValue, setInputValue] = createSignal<string>("");
  const [nextPageToken, setNextPageToken] = createSignal<string>("");
  const [prevPageToken, setPrevPageToken] = createSignal<string>("");

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
    searchVideo("");
  };

  const onClickNext = (e: Event) => {
    e.preventDefault();
    searchVideo(nextPageToken());
  };

  const onClickPrev = (e: Event) => {
    e.preventDefault();
    searchVideo(prevPageToken());
  };
  const searchVideo = async (pageToken: string) => {
    const q = inputValue();
    initGoogleScript(gapi(), () => {
      gapi()
        .client.youtube.search.list({
          q,
          part: "snippet",
          type: "video",
          pageToken,
          videoEmbeddable: true,
          maxResults: 50,
        })
        .then((data: any) => {
          const { nextPageToken, prevPageToken, items } = data.result;
          if (nextPageToken) {
            setNextPageToken(nextPageToken);
          }
          if (prevPageToken) {
            setPrevPageToken(prevPageToken);
          }
          const videos: Video[] = items.map((item: any) => ({
            id: item.id.videoId,
          }));
          if (!videos.length) {
            throw Error("???????????????????????????????????????");
          }
          setVideos(videos);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
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
          placeholder="????????????????????????"
        />
        <button type="submit" class={submitButton}>
          ??????
        </button>
      </form>
      <div class={cardsWrapper}>
        <For each={videos()}>{(video) => <Card youtubeId={video.id} />}</For>
      </div>
      <div class={pagenation}>
        <Show when={prevPageToken() !== ""}>
          <button onClick={(e) => onClickPrev(e)} class={pagenationButton}>
            &lt; ??????
          </button>
        </Show>
        <Show when={nextPageToken() !== ""}>
          <button onClick={(e) => onClickNext(e)} class={pagenationButton}>
            ?????? &gt;
          </button>
        </Show>
      </div>
    </div>
  );
};
