import { CardsWrapper } from "../component/CardsWrapper";
import { heading } from "./Index.css";
import { Component, Show } from "solid-js";
import { getVideos } from "../store/store";
import { A } from "@solidjs/router";

export const Index: Component = () => {
  const videos = getVideos();
  return (
    <>
      <h2 class={heading}>一覧</h2>
      <A href="/search">検索へ</A>
      <Show
        when={videos.length > 0}
        fallback={<p>動画が登録されていません。</p>}
      >
        <CardsWrapper videos={videos} />
      </Show>
    </>
  );
};
