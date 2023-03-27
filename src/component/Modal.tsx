import { Component, JSX } from "solid-js";
import { container, overlay, wrapper } from "./Modal.css";
import { Portal } from "solid-js/web";

type Props = {
  children: JSX.Element;
  id: string;
  modalClose: () => void;
};

export const Modal: Component<Props> = (props) => {
  const onModalClose = (e: Event) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    e.preventDefault();
    props.modalClose();
  };

  return (
    <Portal>
      <div class={wrapper} id={props.id} aria-hidden={true}>
        <div class={overlay} tabIndex={-1} onClick={onModalClose}>
          <div class={container} role="dialog" aria-modal="true">
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
