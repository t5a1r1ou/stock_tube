import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

import { SearchState } from "../types/types";

const searchState = () => {
  const [data, setData] = createStore<SearchState>({
    resultVideos: [],
    total: 0,
    nextPageToken: "",
    currentWord: "",
    inputValue: "",
    error: "",
  });

  const getData = () => data;

  const setApiData = (
    apiData: Pick<SearchState, "resultVideos" | "total" | "nextPageToken">,
  ) => setData({ ...searchState, ...apiData });

  const setResultVideo = (resultVideos: SearchState["resultVideos"]) =>
    setData({ ...searchState, resultVideos });

  const setError = (error: SearchState["error"]) =>
    setData({ ...searchState, error });

  const setInputValue = (inputValue: SearchState["inputValue"]) => {
    setData({ ...searchState, inputValue });
  };

  const setCurrentWord = (currentWord: SearchState["currentWord"]) => {
    setData({ ...searchState, currentWord });
  };

  const clearData = () => {
    setData({
      resultVideos: [],
      total: 0,
      nextPageToken: "",
      currentWord: "",
      inputValue: "",
      error: "",
    });
  };

  return {
    data,
    getData,
    setData,
    setApiData,
    setResultVideo,
    setError,
    setInputValue,
    setCurrentWord,
    clearData,
  };
};

export default createRoot(searchState);
