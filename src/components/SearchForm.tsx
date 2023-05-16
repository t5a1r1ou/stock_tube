import type { Component } from "solid-js";

import { createMemo, Show } from "solid-js";

import { searchStateStore } from "../store";
import { searchForm } from "../styles/style.css";

type Props = {
  submitQuery: (e: Event) => void;
  placeholder: string;
};

export const SearchForm: Component<Props> = (props) => {
  const data = createMemo(() => searchStateStore.getData());

  return (
    <>
      <form onSubmit={(e) => props.submitQuery(e)} class={searchForm.container}>
        <input
          type="search"
          name="search"
          class={data().error ? searchForm.errorInput : searchForm.input}
          value={data().inputValue}
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
      <Show when={data().error !== ""}>
        <p class={searchForm.errorText}>{data().error}</p>
      </Show>
      <Show when={data().currentWord !== ""}>
        <p class={searchForm.result}>
          「{data().currentWord}」の検索結果:{" "}
          {data().total === 1000000
            ? "100万件以上"
            : `${data().total.toLocaleString()}件`}
        </p>
      </Show>
    </>
  );
};
