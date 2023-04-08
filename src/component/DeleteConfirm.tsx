import { Show } from "solid-js";
import { deleteConfirm } from "../styles/style.css";
import type { Component } from "solid-js";

type Props = {
  modalClose: () => void;
  onDelete: () => void;
  title: string;
  desc?: string;
};

export const DeleteConfirm: Component<Props> = (props) => {
  return (
    <>
      <h2 class={deleteConfirm.heading}>{props.title}</h2>
      <Show when={props.desc}>
        <p class={deleteConfirm.desc}>{props.desc}</p>
      </Show>
      <div class={deleteConfirm.buttonContainer}>
        <button class={deleteConfirm.button} onClick={props.modalClose}>
          キャンセル
        </button>
        <button class={deleteConfirm.buttonAlert} onClick={props.onDelete}>
          削除する
        </button>
      </div>
    </>
  );
};
