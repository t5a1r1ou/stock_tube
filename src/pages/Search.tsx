import { Component, For, createEffect } from "solid-js";
import { componentStyles } from "../styles/style.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { SearchForm } from "../component/SearchForm";
import { Pagenation } from "../component/Pagenation";
import { useSearch } from "../hooks/useSearch";
import { A } from "@solidjs/router";
import { getSearchState, setInputValue } from "../store/search";
import { Modal } from "../component/Modal";
import { useModal } from "../hooks/useModal";
import { AddVideoForm } from "../component/AddVideoForm";
import { clearSavingVideo, setSavingVideoInfo } from "../store/savingVideo";
import { Video } from "../types/types";
import SearchedVideoCard from "../component/SearchedVideoCard";

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
      <h2 class={componentStyles.heading}>検索</h2>
      <A href="/library">ライブラリへ</A>
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
