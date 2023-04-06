import { Component, For, createEffect } from "solid-js";
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
} from "../component";
import { componentStyles } from "../styles/style.css";
import type { Video } from "../types/types";

const Search: Component = () => {
  const modalId = "search_modal";

  const { initApi, submitQuery, onClickMore } = useSearch();

  const { modalShow, modalClose } = useModal(modalId);

  const searchModalShow = (video: Video) => {
    modalShow();
    savingVideoStore.setInfo(video);
  };

  const searchModalClose = () => {
    modalClose();
    savingVideoStore.clearData();
  };

  createEffect(() => {
    initApi();
  }, []);

  return (
    <>
      <Head title="StockTube | 検索" />
      <h2 class={componentStyles.heading}>検索</h2>
      <SearchForm
        submitQuery={submitQuery}
        inputValue={searchStateStore.data.inputValue}
        setInputValue={searchStateStore.setInputValue}
        error={searchStateStore.data.error}
        currentWord={searchStateStore.data.currentWord}
        total={searchStateStore.data.total}
      />
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
    </>
  );
};

export default Search;
