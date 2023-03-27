import { CardsWrapper } from "../component/CardsWrapper";
import { componentStyles } from "../styles/style.css";
import { Component, Show } from "solid-js";
import { getVideos } from "../store/videos";
import { A } from "@solidjs/router";
import { useCommon } from "../hooks/useCommon";

const Index: Component = () => {
  const videos = () => getVideos();
  const { observeSearchStockedVideo } = useCommon();
  return (
    <>
      <h2 class={componentStyles.heading}>ライブラリ</h2>
      <A href="/search">検索へ</A>
      <Show
        when={videos().length > 0}
        fallback={<p>動画が登録されていません。</p>}
      >
        <CardsWrapper
          videos={videos()}
          observeSearchStockedVideo={observeSearchStockedVideo}
        />
      </Show>
    </>
  );
};

export default Index;
