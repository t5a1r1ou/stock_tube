import { For, Show, createSignal, onMount } from "solid-js";
import { Head } from "../layout/Head";
import { deletingVideo, savingVideoStore, searchStateStore } from "../store";
import { useConfirmModal, useModal, useSearch } from "../hooks/";
import {
  AddVideoForm,
  CardsWrapper,
  DeleteConfirm,
  Modal,
  Pagenation,
  SearchForm,
  SearchedVideoCard,
  Spinner,
} from "../component";
import { mixin } from "../styles/style.css";
import { truncateWithEllipsis12 } from "../scripts/util";
import type { Component } from "solid-js";
import type { Video } from "../types/types";

const Search: Component = () => {
  const addVideoModalId = "search_modal";
  const confirmModalId = "confirm_modal";
  const [loadingSearch, setLoadingSearch] = createSignal<boolean>(false);

  const {
    initApi: initSearchApi,
    submitQuery,
    onClickMore,
  } = useSearch(setLoadingSearch);

  const { modalShow: addVideoModalShow, modalClose: addVideoModalClose } =
    useModal(addVideoModalId);
  const { modalShow: confirmModalShow, modalClose: confirmModalClose } =
    useModal(confirmModalId);

  const { onConfirmVideoModalShow, onConfirmVideoModalDelete } =
    useConfirmModal({
      modalShow: confirmModalShow,
      modalClose: confirmModalClose,
    });

  const onAddVideoModalShow = (video: Video) => {
    savingVideoStore.setInfo(video);
    addVideoModalShow();
  };

  const searchModalClose = () => {
    addVideoModalClose();
    savingVideoStore.clearData();
  };

  onMount(() => initSearchApi());

  return (
    <>
      <Head title="StockTube | 検索" />
      <h2 class={mixin.visuallyHidden}>検索</h2>
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
          modalClose={searchModalClose}
          fullWidth={false}
        >
          <AddVideoForm modalClose={searchModalClose} />
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
              deletingVideo.data.title
            )}」を削除しますか？`}
            desc={"元に戻す場合は再度検索して追加する必要があります。"}
          />
        </Modal>
      </Show>
    </>
  );
};

export default Search;
