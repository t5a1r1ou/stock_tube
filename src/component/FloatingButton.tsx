import { Component } from "solid-js";
import { componentStyles, mixin } from "../styles/style.css";

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
      <p class={mixin.visuallyHidden}>{props.text}</p>
      <div class={componentStyles.floatingButton.iconAdd}></div>
    </button>
  );
};
