import { componentStyles } from "../styles/style.css";
import type { Component } from "solid-js";

type Props = {
  onClick: () => void;
  text: string;
};

export const FloatingButton: Component<Props> = (props) => {
  return (
    <button
      class={componentStyles.floatingButton.container}
      onClick={props.onClick}
    >
      <p class={componentStyles.hiddenText}>{props.text}</p>
      <div class={componentStyles.floatingButton.iconAdd}></div>
    </button>
  );
};
