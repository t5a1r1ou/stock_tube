import { Component, createEffect, createSignal } from "solid-js";
import { heading } from "./Search.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { SearchForm } from "../component/SearchForm";
import { Pagenation } from "../component/Pagenation";
import { useSearch } from "../hooks/useSearch";
import { A } from "@solidjs/router";
import { getSearchState, setInputValue } from "../store/search";
import { useCommon } from "../hooks/useCommon";

export const Search: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const state = () => getSearchState();

  const { initAuthAndApi, submitQuery, onClickMore } = useSearch({
    gapi,
    setGapi,
  });

  const { observeSearchStockedVideo } = useCommon();

  createEffect(() => {
    initAuthAndApi();
  }, []);

  return (
    <div>
      <h2 class={heading}>検索</h2>
      <A href="/">一覧へ</A>
      <SearchForm
        submitQuery={submitQuery}
        inputValue={state().inputValue}
        setInputValue={setInputValue}
        error={state().error}
        currentWord={state().currentWord}
        total={state().total}
      />
      <CardsWrapper
        videos={state().resultVideos}
        observeSearchStockedVideo={observeSearchStockedVideo}
      />
      <Pagenation
        nextPageToken={state().nextPageToken}
        onClickMore={onClickMore}
      />
    </div>
  );
};
