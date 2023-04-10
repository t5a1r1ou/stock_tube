import { For, Show, createSignal, onMount } from "solid-js";
import { Head } from "../layout/Head";
import {
  deletingVideoStore,
  foldersStore,
  savingVideoStore,
  searchStateStore,
} from "../store";
import {
  useConfirmModal,
  useModal,
  usePicmo,
  useSavingFolder,
  useSearch,
} from "../hooks/";
import {
  AddVideoForm,
  CardsWrapper,
  DeleteConfirm,
  EditFolderForm,
  Modal,
  Pagenation,
  SearchForm,
  SearchedVideoCard,
  Spinner,
} from "../components";
import { componentStyles } from "../styles/style.css";
import { truncateWithEllipsis12 } from "../scripts/util";
import type { Component } from "solid-js";
import type { PopupPickerController } from "@picmo/popup-picker";
import type { Video } from "../types/types";

const Search: Component = () => {
  const addVideoModalId = "add_video_modal";
  const confirmModalId = "confirm_modal";
  const addFolderModalId = "add_folder_modal";
  let emojiPopup: PopupPickerController | undefined;
  const [loadingSearch, setLoadingSearch] = createSignal<boolean>(false);

  const {
    initApi: initSearchApi,
    submitQuery,
    onClickMore,
  } = useSearch(setLoadingSearch);

  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();

  const { modalShow: addVideoModalShow, modalClose: addVideoModalClose } =
    useModal(addVideoModalId);
  const { modalShow: confirmModalShow, modalClose: confirmModalClose } =
    useModal(confirmModalId);
  const { modalShow: addFolderModalShow, modalClose: addFolderModalClose } =
    useModal(addFolderModalId);

  const { createPicmo, registerListener, toggleEmoji } = usePicmo();

  const { onConfirmVideoModalShow, onConfirmVideoModalDelete } =
    useConfirmModal({
      modalShow: confirmModalShow,
      modalClose: confirmModalClose,
    });

  const onAddVideoModalShow = (video: Video) => {
    savingVideoStore.setInfo(video);
    addVideoModalShow();
  };

  const onAddVideoModalClose = () => {
    addVideoModalClose();
    savingVideoStore.clearData();
  };

  onMount(() => {
    foldersStore.fetchData();
    initSearchApi();
    emojiPopup = createPicmo();
    registerListener(emojiPopup, inputIcon);
  });

  const onToggleEmoji = (e: Event) => toggleEmoji(e, emojiPopup);

  return (
    <>
      <Head title="StockTube | 検索" />
      <h2 class={componentStyles.visuallyHidden}>検索</h2>
      <SearchForm
        submitQuery={submitQuery}
        inputValue={searchStateStore.data.inputValue}
        setInputValue={searchStateStore.setInputValue}
        error={searchStateStore.data.error}
        currentWord={searchStateStore.data.currentWord}
        total={searchStateStore.data.total}
      />
      <Show when={!loadingSearch()} fallback={<Spinner />}>
        <CardsWrapper>
          <For each={searchStateStore.data.resultVideos}>
            {(video) => (
              <SearchedVideoCard
                video={video}
                addVideoModalShow={onAddVideoModalShow}
                confirmModalShow={onConfirmVideoModalShow}
              />
            )}
          </For>
        </CardsWrapper>
        <Pagenation
          nextPageToken={searchStateStore.data.nextPageToken}
          onClickMore={onClickMore}
        />
        <Modal
          id={addVideoModalId}
          modalClose={onAddVideoModalClose}
          fullWidth={false}
        >
          <AddVideoForm
            addVideoModalClose={onAddVideoModalClose}
            addFolderModalShow={addFolderModalShow}
          />
        </Modal>
        <Modal
          id={confirmModalId}
          modalClose={confirmModalClose}
          fullWidth={false}
        >
          <DeleteConfirm
            modalClose={confirmModalClose}
            onDelete={onConfirmVideoModalDelete}
            title={`「${truncateWithEllipsis12(
              deletingVideoStore.data.title
            )}」を削除しますか？`}
            desc={"元に戻す場合は再度検索して追加する必要があります。"}
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
      </Show>
    </>
  );
};

export default Search;
