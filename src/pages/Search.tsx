import { For, Show, createSignal, onMount } from "solid-js";
import { Head } from "../layout/Head";
import {
  deletingVideoStore,
  foldersStore,
  savingVideoStore,
  searchStateStore,
  videosStore,
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
  SegmentControl,
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
  const [searchType, setSearchType] = createSignal<"keyword" | "url">(
    "keyword"
  );

  const { initApi: initSearchApi, searchVideo } = useSearch(setLoadingSearch);

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

  const onToggleEmoji = (e: Event) => toggleEmoji(e, emojiPopup);

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(searchStateStore.data.inputValue, undefined, searchType());
    // URL検索の場合、即時追加モーダルを表示
    if (searchType() === "url") {
      addVideoModalShow();
    }
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(
      searchStateStore.data.currentWord,
      searchStateStore.data.nextPageToken,
      searchType()
    );
  };

  const onChangeSearchType = (e: { currentTarget: HTMLInputElement }) => {
    const value = e.currentTarget.value as "keyword" | "url";
    setSearchType(value);
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
    videosStore.fetchData();
    foldersStore.fetchData();
    initSearchApi();
    emojiPopup = createPicmo();
    registerListener(emojiPopup, inputIcon);
  });

  return (
    <>
      <Head title="StockTube | 検索" />
      <SegmentControl
        id="searchType"
        data={[
          {
            value: "keyword",
            text: "キーワード検索",
          },
          {
            value: "url",
            text: "URL検索",
          },
        ]}
        state={searchType()}
        onChange={onChangeSearchType}
      />
      <h2 class={componentStyles.heading}>
        {searchType() === "keyword" ? "キーワード検索" : "URL検索"}
      </h2>
      <SearchForm
        submitQuery={submitQuery}
        placeholder={
          searchType() === "keyword"
            ? "検索ワードを入力してください"
            : "URLを入力してください"
        }
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
            title={deleteConfirmTitle()}
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
