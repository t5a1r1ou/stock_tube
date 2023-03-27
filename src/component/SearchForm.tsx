import { Component, Show } from "solid-js";
import { input } from "../styles/utility.css";
import {
  errorText,
  container,
  searchResult,
  submitButton,
} from "./SearchForm.css";

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
      <form onSubmit={(e) => props.submitQuery(e)} class={container}>
        <input
          type="search"
          name="search"
          class={input}
          value={props.inputValue}
          onInput={(e) => props.setInputValue(e.currentTarget.value)}
          onChange={(e) => props.setInputValue(e.currentTarget.value)}
          placeholder="検索ワードを入力"
        />
        <button type="submit" class={submitButton}>
          検索
        </button>
      </form>
      <Show when={props.error !== ""}>
        <p class={errorText}>{props.error}</p>
      </Show>
      <Show when={props.currentWord !== ""}>
        <p class={searchResult}>
          「{props.currentWord}」の検索結果:{" "}
          {props.total === 1000000
            ? "100万件以上"
            : `${props.total.toLocaleString()}件`}
        </p>
      </Show>
    </>
  );
};
