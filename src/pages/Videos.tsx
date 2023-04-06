import { Component, For, Show, onMount, createMemo } from "solid-js";
import { A, useParams } from "@solidjs/router";
import {
  currentVideoStore,
  foldersStore,
  playerStore,
  videosStore,
} from "../store";
import { useCommon, useModal, useYoutubePlayer } from "../hooks/";
import { CardsWrapper, Modal, VideoCard, YoutubePlayer } from "../component";
import { componentStyles } from "../styles/style.css";
import type { Video } from "../types/types";
import { Head } from "../layout/Head";

const Videos: Component = () => {
  const { url_id } = useParams();
  const urlVideos = createMemo(() => videosStore.getFromUrl(url_id));
  const folder = () => foldersStore.getFolderFromUrl(url_id);
  const modalId = "play_modal";
  const iframeId = "play_iframe";
  const { observeSearchStockedVideo } = useCommon();
  const { modalShow, modalClose } = useModal(modalId);

  const onDelete = (id: Video["youtube_id"]) => {
    videosStore.removeData(id);
    observeSearchStockedVideo();
  };

  const { initApi } = useYoutubePlayer(iframeId);

  const playerModalShow = (id: Video["youtube_id"]) => {
    if (id !== currentVideoStore.id()) {
      currentVideoStore.setId(id);
      playerStore.data().loadVideoById({ videoId: currentVideoStore.id() });
    }
    playerStore.data().playVideo();
    modalShow();
  };

  const playerModalClose = () => {
    playerStore.data().pauseVideo();
    modalClose();
  };

  const onStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.ENDED) {
      const index = urlVideos().findIndex(
        (video) => video.youtube_id === currentVideoStore.id()
      );
      if (index === urlVideos().length - 1) {
        modalClose();
      } else {
        const nextVideoId = urlVideos()[index + 1].youtube_id;
        currentVideoStore.setId(nextVideoId);
        playerStore.data().loadVideoById({ videoId: currentVideoStore.id() });
        playerStore.data().playVideo();
      }
    }
  };

  const onError = () => {
    playerStore.data().loadVideoById({ videoId: currentVideoStore.id() });
    playerStore.data().playVideo();
  };

  onMount(() => {
    videosStore.fetchData();
    foldersStore.fetchData();
    initApi({ onStateChange, onError });
  });

  return (
    <>
      <Head title={`StockTube | ${folder()?.name}${folder()?.icon}`} />
      <A href="/library" class={componentStyles.backTo}>
        &lt; ライブラリ一覧へ戻る
      </A>
      <h2 class={componentStyles.heading}>
        {folder()?.name}
        {folder()?.icon}
      </h2>
      <Show
        when={urlVideos().length > 0}
        fallback={<p>動画が登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={urlVideos()}>
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
