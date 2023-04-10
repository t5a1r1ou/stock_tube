import { Show } from "solid-js";
import { searchForm } from "../styles/style.css";
import type { Component } from "solid-js";

type Props = {
  submitQuery: (e: Event) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  error: string;
  currentWord: string;
  total: Number;
};

export const SearchForm: Component<Props> = (props) => {
  return (
    <>
      <form onSubmit={(e) => props.submitQuery(e)} class={searchForm.container}>
        <input
          type="search"
          name="search"
          class={props.error ? searchForm.errorInput : searchForm.input}
          value={props.inputValue}
          onInput={(e) => props.setInputValue(e.currentTarget.value)}
          onChange={(e) => props.setInputValue(e.currentTarget.value)}
          placeholder="検索ワードを入力"
        />
        <button type="submit" class={searchForm.submitButton}>
          検索
        </button>
      </form>
      <Show when={props.error !== ""}>
        <p class={searchForm.errorText}>{props.error}</p>
      </Show>
      <Show when={props.currentWord !== ""}>
        <p class={searchForm.result}>
          「{props.currentWord}」の検索結果:{" "}
          {props.total === 1000000
            ? "100万件以上"
            : `${props.total.toLocaleString()}件`}
        </p>
      </Show>
    </>
  );
};