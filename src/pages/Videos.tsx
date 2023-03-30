import { CardsWrapper } from "../component/CardsWrapper";
import { componentStyles } from "../styles/style.css";
import { Component, For, Show } from "solid-js";
import { getFolderVideosFromUrl, removeVideo } from "../store/videos";
import { A, useParams } from "@solidjs/router";
import VideoCard from "../component/VideoCard";
import { getFolderFromUrl } from "../store/folders";
import { Video } from "../types/types";
import { useCommon } from "../hooks/useCommon";

const Videos: Component = () => {
  const { url_id } = useParams();
  const videos = () => getFolderVideosFromUrl(url_id);
  const folder = () => getFolderFromUrl(url_id);
  const { observeSearchStockedVideo } = useCommon();

  const onDelete = (id: Video["youtube_id"]) => {
    removeVideo(id);
    observeSearchStockedVideo();
  };

  return (
    <>
      <h2 class={componentStyles.heading}>
        {folder()?.name}
        {folder()?.icon}
      </h2>
      <A href="/search">検索へ</A>
      <A href="/library">ライブラリへ</A>
      <Show
        when={videos().length > 0}
        fallback={<p>動画が登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={videos()}>
            {(video) => <VideoCard {...video} onDelete={onDelete} />}
          </For>
        </CardsWrapper>
      </Show>
    </>
  );
};

export default Videos;
