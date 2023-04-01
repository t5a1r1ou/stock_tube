import { Component, Show } from "solid-js";
import { pagenation } from "../styles/style.css";

type Props = {
  nextPageToken: string;
  onClickMore: (e: Event) => void;
};

export const Pagenation: Component<Props> = (props) => {
  return (
    <div class={pagenation.container}>
      <Show when={props.nextPageToken !== ""}>
        <button onClick={props.onClickMore} class={pagenation.button}>
          もっと見る
        </button>
      </Show>
    </div>
  );
};
