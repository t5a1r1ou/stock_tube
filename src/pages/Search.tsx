import { Component, createEffect, createSignal } from "solid-js";
import { heading } from "./Search.css";
import type { ApiData } from "../types/types";
import { CardsWrapper } from "../component/CardsWrapper";
import { SearchForm } from "../component/SearchForm";
import { Pagenation } from "../component/Pagenation";
import { useSearch } from "../hooks/useSearch";
import { A } from "@solidjs/router";

export const Search: Component = () => {
  const [gapi, setGapi] = createSignal<any>(null);
  const [inputValue, setInputValue] = createSignal<string>("");
  const [apiData, setApiData] = createSignal<ApiData>({
    resultVideos: [],
    total: 0,
    nextPageToken: "",
  });
  const [currentWord, setCurrentWord] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");

  const {
    initAuthAndApi,
    submitQuery,
    onClickMore,
    observeSearchStockedVideo,
  } = useSearch({
    gapi,
    setGapi,
    apiData,
    setApiData,
    currentWord,
    setCurrentWord,
    setError,
    inputValue,
  });

  createEffect(() => {
    initAuthAndApi();
  }, []);

  return (
    <div>
      <h2 class={heading}>検索</h2>
      <A href="/">一覧へ</A>
      <SearchForm
        submitQuery={submitQuery}
        inputValue={inputValue()}
        setInputValue={setInputValue}
        error={error()}
        currentWord={currentWord()}
        total={apiData().total}
      />
      <CardsWrapper
        videos={apiData().resultVideos}
        observeSearchStockedVideo={observeSearchStockedVideo}
      />
      <Pagenation
        nextPageToken={apiData().nextPageToken}
        onClickMore={onClickMore}
      />
    </div>
  );
};
