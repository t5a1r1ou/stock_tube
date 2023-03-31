import { Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { modal } from "../styles/style.css";

type Props = {
  children: JSX.Element;
  id: string;
  modalClose: () => void;
  fullWidth: boolean;
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
      <div class={modal.wrapper} id={props.id} aria-hidden={true}>
        <div class={modal.overlay} tabIndex={-1} onClick={onModalClose}>
          <div
            class={props.fullWidth ? modal.fullWidthContainer : modal.container}
            role="dialog"
            aria-modal="true"
          >
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
