import { For, Show, onMount, createMemo, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import {
  currentVideoStore,
  deletingVideoStore,
  foldersStore,
  playerStore,
  savingVideoStore,
  videosStore,
} from "../store";
import {
  useConfirmModal,
  useModal,
  usePicmo,
  useSavingFolder,
  useYoutubePlayer,
} from "../hooks/";
import {
  CardsWrapper,
  DeleteConfirm,
  EditFolderForm,
  EditVideoForm,
  Modal,
  Spinner,
  VideoCard,
  YoutubePlayer,
} from "../components";
import { componentStyles } from "../styles/style.css";
import { Head } from "../layout/Head";
import { truncateWithEllipsis12 } from "../scripts/util";
import type { Component } from "solid-js";
import type { Video } from "../types/types";
import { PopupPickerController } from "@picmo/popup-picker";

const Videos: Component = () => {
  const [loadingVideo, setLoadingVideo] = createSignal<boolean>(true);
  const [loadingFolder, setLoadingFolder] = createSignal<boolean>(true);
  const { url_id } = useParams();
  const urlVideos = createMemo(() => videosStore.getFromUrl(url_id));
  const folder = () => foldersStore.getFolderFromUrl(url_id);
  const playModalId = "play_modal";
  const iframeId = "video_play_iframe";
  const confirmModalId = "confirm_modal";
  const moveModalId = "move_modal";
  const addFolderModalId = "add_folder_modal";
  let emojiPopup: PopupPickerController | undefined;
  const { modalShow: playModalShow, modalClose: playModalClose } =
    useModal(playModalId);
  const { modalShow: confirmModalShow, modalClose: confirmModalClose } =
    useModal(confirmModalId);
  const { modalShow: moveModalShow, modalClose: moveModalClose } =
    useModal(moveModalId);
  const { modalShow: addFolderModalShow, modalClose: addFolderModalClose } =
    useModal(addFolderModalId);
  const { onConfirmVideoModalShow, onConfirmVideoModalDelete } =
    useConfirmModal({
      modalShow: confirmModalShow,
      modalClose: confirmModalClose,
    });

  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();
  const { createPicmo, registerListener, toggleEmoji } = usePicmo();

  const onToggleEmoji = (e: Event) => toggleEmoji(e, emojiPopup);

  const { initApi } = useYoutubePlayer(iframeId);

  const playerModalShow = (id: Video["youtube_id"]) => {
    if (id !== currentVideoStore.id()) {
      currentVideoStore.setId(id);
      playerStore.data().loadVideoById({ videoId: currentVideoStore.id() });
    }
    playerStore.data().playVideo();
    playModalShow();
  };

  const playerModalClose = () => {
    playerStore.data().pauseVideo();
    playModalClose();
  };

  const onMoveModalShow = (video: Video) => {
    savingVideoStore.setData(video);
    moveModalShow();
  };

  const onMoveModalClose = () => {
    savingVideoStore.clearData();
    moveModalClose();
  };

  const onStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.ENDED) {
      const index = urlVideos().findIndex(
        (video) => video.youtube_id === currentVideoStore.id()
      );
      if (index === urlVideos().length - 1) {
        playModalClose();
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

  const deleteConfirmTitle = () => {
    if (!deletingVideoStore.data.folder_id) {
      return "";
    }
    const folder = foldersStore.getFolder(deletingVideoStore.data.folder_id);
    return `${folder!.name}${
      folder!.icon
    }フォルダから「${truncateWithEllipsis12(
      deletingVideoStore.data.title
    )}」を削除しますか？`;
  };

  onMount(() => {
    if (videosStore.data.length > 0 && foldersStore.data.length > 0) {
      setLoadingFolder(false);
      setLoadingVideo(false);
    } else {
      videosStore.fetchData(() => setLoadingVideo(false));
      foldersStore.fetchData(() => setLoadingFolder(false));
    }
    emojiPopup = createPicmo();
    registerListener(emojiPopup, inputIcon);
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
      <Show when={!loadingVideo() && !loadingFolder()} fallback={<Spinner />}>
        <Show
          when={urlVideos().length > 0}
          fallback={<p>動画が登録されていません。</p>}
        >
          <CardsWrapper>
            <For each={urlVideos()}>
              {(video) => (
                <VideoCard
                  video={video}
                  moveModalShow={onMoveModalShow}
                  playModalShow={playerModalShow}
                  deleteModalShow={onConfirmVideoModalShow}
                />
              )}
            </For>
          </CardsWrapper>
        </Show>
      </Show>
      <Modal id={playModalId} modalClose={playerModalClose} fullWidth={true}>
        <YoutubePlayer id={iframeId} />
      </Modal>
      <Modal
        id={confirmModalId}
        modalClose={confirmModalClose}
        fullWidth={false}
      >
        <DeleteConfirm
          modalClose={confirmModalClose}
          onDelete={onConfirmVideoModalDelete}
          title={deleteConfirmTitle()}
          desc={"元に戻す場合は再度検索して追加する必要があります。"}
        />
      </Modal>
      <Modal id={moveModalId} modalClose={moveModalClose} fullWidth={false}>
        <EditVideoForm
          type={"edit"}
          editFolderModalShow={addFolderModalShow}
          editVideoModalClose={onMoveModalClose}
        />
      </Modal>
      <Modal
        id={addFolderModalId}
        modalClose={addFolderModalClose}
        fullWidth={false}
      >
        <EditFolderForm
          modalType={"new"}
          error={error}
          isValidForm={isValidForm}
          inputName={inputName}
          submit={submit}
          modalClose={addFolderModalClose}
          onToggleEmoji={onToggleEmoji}
        />
      </Modal>
    </>
  );
};

export default Videos;
