import { createStore } from "solid-js/store";
import { SearchState } from "../types/types";

const [searchState, setSearchState] = createStore<SearchState>({
  resultVideos: [],
  total: 0,
  nextPageToken: "",
  currentWord: "",
  inputValue: "",
  error: "",
});

export const getSearchState = () => searchState;

export const getResultVideos = () => searchState.resultVideos;

export const setAllSearchState = (data: SearchState) => setSearchState(data);

export const setApiData = (
  apiData: Pick<SearchState, "resultVideos" | "total" | "nextPageToken">
) => setSearchState({ ...searchState, ...apiData });

export const setResultVideo = (resultVideos: SearchState["resultVideos"]) =>
  setSearchState({ ...searchState, resultVideos });

export const setError = (error: SearchState["error"]) =>
  setSearchState({ ...searchState, error });

export const setInputValue = (inputValue: SearchState["inputValue"]) => {
  setSearchState({ ...searchState, inputValue });
};

export const setCurrentWord = (currentWord: SearchState["currentWord"]) => {
  setSearchState({ ...searchState, currentWord });
};

export const clearSearchState = () => {
  setSearchState({
    resultVideos: [],
    total: 0,
    nextPageToken: "",
    currentWord: "",
    inputValue: "",
    error: "",
  });
};
