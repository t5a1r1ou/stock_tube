import { For, Show, createEffect, createSignal } from "solid-js";
import { Head } from "../layout/Head";
import { savingVideoStore, searchStateStore } from "../store";
import { useModal, useSearch } from "../hooks/";
import {
  AddVideoForm,
  CardsWrapper,
  Modal,
  Pagenation,
  SearchForm,
  SearchedVideoCard,
  Spinner,
} from "../component";
import { mixin } from "../styles/style.css";
import type { Component } from "solid-js";
import type { Video } from "../types/types";

const Search: Component = () => {
  const modalId = "search_modal";
  const [loadingSearch, setLoadingSearch] = createSignal<boolean>(false);

  const { initApi, submitQuery, onClickMore } = useSearch(setLoadingSearch);

  const { modalShow, modalClose } = useModal(modalId);

  const searchModalShow = (video: Video) => {
    modalShow();
    savingVideoStore.setInfo(video);
  };

  const searchModalClose = () => {
    modalClose();
    savingVideoStore.clearData();
  };

  createEffect(() => initApi(), []);

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
              <SearchedVideoCard video={video} modalShow={searchModalShow} />
            )}
          </For>
        </CardsWrapper>
        <Pagenation
          nextPageToken={searchStateStore.data.nextPageToken}
          onClickMore={onClickMore}
        />
        <Modal id={modalId} modalClose={searchModalClose} fullWidth={false}>
          <AddVideoForm modalClose={searchModalClose} />
        </Modal>
      </Show>
    </>
  );
};

export default Search;
