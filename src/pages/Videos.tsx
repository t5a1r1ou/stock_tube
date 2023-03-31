import { CardsWrapper } from "../component/CardsWrapper";
import { componentStyles } from "../styles/style.css";
import { Component, For, Show, onMount } from "solid-js";
import {
  fetchVideos,
  getFolderVideosFromUrl,
  removeVideo,
} from "../store/videos";
import { A, useParams } from "@solidjs/router";
import VideoCard from "../component/VideoCard";
import { fetchFolders, getFolderFromUrl } from "../store/folders";
import { Video } from "../types/types";
import { useCommon } from "../hooks/useCommon";
import { Modal } from "../component/Modal";
import { useModal } from "../hooks/useModal";
import { YoutubePlayer } from "../component/YoutubePlayer";
import { useYoutubePlayer } from "../hooks/useYoutubePlayer";
import { getPlayer } from "../store/player";

const Videos: Component = () => {
  const { url_id } = useParams();
  const videos = () => getFolderVideosFromUrl(url_id);
  const folder = () => getFolderFromUrl(url_id);
  const modalId = "play_modal";
  const iframeId = "play_iframe";
  const { observeSearchStockedVideo } = useCommon();
  const { modalShow, modalClose } = useModal(modalId);

  const onDelete = (id: Video["youtube_id"]) => {
    removeVideo(id);
    observeSearchStockedVideo();
  };

  const { initApi } = useYoutubePlayer(iframeId);

  onMount(() => {
    fetchVideos();
    fetchFolders();
    initApi();
  });

  const playerModalShow = (id: Video["youtube_id"]) => {
    const player = getPlayer();
    player.loadVideoById({ videoId: id });
    player.playVideo();
    modalShow();
  };

  const playerModalClose = () => {
    const player = getPlayer();
    player.pauseVideo();
    modalClose();
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
            {(video) => (
              <VideoCard
                {...video}
                onDelete={onDelete}
                modalShow={playerModalShow}
                iframeId={iframeId}
              />
            )}
          </For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={playerModalClose}>
        <YoutubePlayer id={iframeId} />
      </Modal>
    </>
  );
};

export default Videos;
