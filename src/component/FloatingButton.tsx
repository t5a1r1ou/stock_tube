import { Component } from "solid-js";
import { componentStyles, mixin } from "../styles/style.css";

type Props = {
  modalShow: () => void;
};

export const FloatingButton: Component<Props> = (props) => {
  return (
    <button
      class={componentStyles.floatingButton.container}
      onClick={props.modalShow}
    >
      <p class={mixin.visuallyHidden}>ライブラリを追加</p>
      <div class={componentStyles.floatingButton.iconAdd}></div>
    </button>
  );
};
