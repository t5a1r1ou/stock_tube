import { Show } from "solid-js";
import { searchForm } from "../styles/style.css";
import type { Component } from "solid-js";
import { searchStateStore } from "../store";

type Props = {
  submitQuery: (e: Event) => void;
  placeholder: string;
};

export const SearchForm: Component<Props> = (props) => {
  const { inputValue, error, currentWord, total } = searchStateStore.data;

  return (
    <>
      <form onSubmit={(e) => props.submitQuery(e)} class={searchForm.container}>
        <input
          type="search"
          name="search"
          class={error ? searchForm.errorInput : searchForm.input}
          value={inputValue}
          onInput={(e) => searchStateStore.setInputValue(e.currentTarget.value)}
          onChange={(e) =>
            searchStateStore.setInputValue(e.currentTarget.value)
          }
          placeholder={props.placeholder}
        />
        <button type="submit" class={searchForm.submitButton}>
          検索
        </button>
      </form>
      <Show when={error !== ""}>
        <p class={searchForm.errorText}>{error}</p>
      </Show>
      <Show when={currentWord !== ""}>
        <p class={searchForm.result}>
          「{currentWord}」の検索結果:{" "}
          {total === 1000000 ? "100万件以上" : `${total.toLocaleString()}件`}
        </p>
      </Show>
    </>
  );
};
