import { Component, Show } from "solid-js";
import { button, container } from "./Pagenation.css";

type Props = {
  nextPageToken: string;
  onClickMore: (e: Event) => void;
};

export const Pagenation: Component<Props> = (props) => {
  return (
    <div class={container}>
      <Show when={props.nextPageToken !== ""}>
        <button onClick={(e) => props.onClickMore(e)} class={button}>
          もっと見る
        </button>
      </Show>
    </div>
  );
};
