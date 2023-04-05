import { Component, For, Show, onMount } from "solid-js";
import { A, useParams } from "@solidjs/router";
import {
  fetchVideos,
  getFolderVideosFromUrl,
  removeVideo,
} from "../store/videos";
import { currentYoutubeId, setCurrentYoutubeId } from "../store/currentVideo";
import { fetchFolders, getFolderFromUrl } from "../store/folders";
import { getPlayer } from "../store/player";
import { useCommon, useModal, useYoutubePlayer } from "../hooks/";
import { CardsWrapper, Modal, VideoCard, YoutubePlayer } from "../component";
import { componentStyles } from "../styles/style.css";
import type { Video } from "../types/types";

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

  const playerModalShow = (id: Video["youtube_id"]) => {
    const player = getPlayer();
    if (id !== currentYoutubeId()) {
      setCurrentYoutubeId(id);
      player.loadVideoById({ videoId: currentYoutubeId() });
    }
    player.playVideo();
    modalShow();
  };

  const playerModalClose = () => {
    const player = getPlayer();
    player.pauseVideo();
    modalClose();
  };

  const continuousPlay = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.ENDED) {
      const index = videos().findIndex(
        (video) => video.youtube_id === currentYoutubeId()
      );
      if (index === videos().length - 1) {
        modalClose();
      } else {
        const nextVideoId = videos()[index + 1].youtube_id;
        const player = getPlayer();
        setCurrentYoutubeId(nextVideoId);
        player.loadVideoById({ videoId: currentYoutubeId() });
        player.playVideo();
      }
    }
  };

  onMount(() => {
    fetchVideos();
    fetchFolders();
    initApi(continuousPlay);
  });

  return (
    <>
      <A href="/library" class={componentStyles.backTo}>
        &lt; ライブラリ一覧へ戻る
      </A>
      <h2 class={componentStyles.heading}>
        {folder()?.name}
        {folder()?.icon}
      </h2>
      <Show
        when={videos().length > 0}
        fallback={<p>動画が登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={videos()}>
            {(video) => (
              <VideoCard
                video={video}
                onDelete={onDelete}
                modalShow={playerModalShow}
                iframeId={iframeId}
              />
            )}
          </For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={playerModalClose} fullWidth={true}>
        <YoutubePlayer id={iframeId} />
      </Modal>
    </>
  );
};

export default Videos;
