import { Component, For, createEffect } from "solid-js";
import { Head } from "../layout/Head";
import { getSearchState, setInputValue } from "../store/search";
import { clearSavingVideo, setSavingVideoInfo } from "../store/savingVideo";
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
  const searchState = () => getSearchState();
  const modalId = "search_modal";

  const { initApi, submitQuery, onClickMore } = useSearch();

  const { modalShow, modalClose } = useModal(modalId);

  const searchModalShow = (video: Video) => {
    modalShow();
    setSavingVideoInfo(video);
  };

  const searchModalClose = () => {
    modalClose();
    clearSavingVideo();
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
        inputValue={searchState().inputValue}
        setInputValue={setInputValue}
        error={searchState().error}
        currentWord={searchState().currentWord}
        total={searchState().total}
      />
      <CardsWrapper>
        <For each={searchState().resultVideos}>
          {(video) => (
            <SearchedVideoCard video={video} modalShow={searchModalShow} />
          )}
        </For>
      </CardsWrapper>
      <Pagenation
        nextPageToken={searchState().nextPageToken}
        onClickMore={onClickMore}
      />
      <Modal id={modalId} modalClose={searchModalClose} fullWidth={false}>
        <AddVideoForm modalClose={searchModalClose} />
      </Modal>
    </>
  );
};

export default Search;
