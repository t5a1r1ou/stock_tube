import { Component, createEffect, createSignal } from "solid-js";
import { heading } from "./Search.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { SearchForm } from "../component/SearchForm";
import { Pagenation } from "../component/Pagenation";
import { useSearch } from "../hooks/useSearch";
import { A } from "@solidjs/router";
import { getSearchState, setInputValue } from "../store/search";
import { useCommon } from "../hooks/useCommon";
import { Modal } from "../component/Modal";
import { useModal } from "../hooks/useModal";
import { AddVideoForm } from "../component/AddVideoForm";
import { getSavingVideo, setSavingVideoInfo } from "../store/savingVideo";
import { Video } from "../types/types";

export const Search: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const searchState = () => getSearchState();
  const savingVideo = () => getSavingVideo();
  const modalId = "search_modal";

  const { initApi, submitQuery, onClickMore } = useSearch({
    gapi,
    setGapi,
  });

  const { observeSearchStockedVideo } = useCommon();

  const { modalShow, modalClose } = useModal(modalId);

  const searchModalShow = (video: Video) => {
    modalShow();
    setSavingVideoInfo(video);
  };

  const searchModalClose = () => {
    modalClose();
    setSavingVideoInfo({
      id: "",
      title: "",
      thumbnail: "",
      folder: "",
      publishedAt: "",
      isStocked: true,
    });
  };

  createEffect(() => {
    initApi();
  }, []);

  return (
    <div>
      <h2 class={heading}>検索</h2>
      <A href="/">一覧へ</A>
      <SearchForm
        submitQuery={submitQuery}
        inputValue={searchState().inputValue}
        setInputValue={setInputValue}
        error={searchState().error}
        currentWord={searchState().currentWord}
        total={searchState().total}
      />
      <CardsWrapper
        videos={searchState().resultVideos}
        observeSearchStockedVideo={observeSearchStockedVideo}
        modalShow={searchModalShow}
      />
      <Pagenation
        nextPageToken={searchState().nextPageToken}
        onClickMore={onClickMore}
      />
      <Modal id={modalId} modalClose={searchModalClose}>
        <AddVideoForm video={savingVideo()} />
      </Modal>
    </div>
  );
};
