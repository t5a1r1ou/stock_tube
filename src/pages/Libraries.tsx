import { Component, For, Show, onMount } from "solid-js";
import { getFolders } from "../store/folders";
import { componentStyles } from "../styles/style.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { FolderCard } from "../component/FolderCard";
import { Modal } from "../component/Modal";
import { useModal } from "../hooks/useModal";
import { AddFolderForm } from "../component/AddFolderForm";
import { FloatingButton } from "../component/FloatingButton";
import { PopupPickerController, createPopup } from "@picmo/popup-picker";
import ja from "../lib/picmo/lang-ja";
import { useSavingFolder } from "../hooks/useSavingFolder";

const Library: Component = () => {
  const folders = () => getFolders();
  const modalId = "library_modal";
  const { modalShow, modalClose } = useModal(modalId);
  let emojiPopup: PopupPickerController | undefined;
  const { error, isValidForm, onInputName, onInputIcon, submit } =
    useSavingFolder();

  onMount(() => {
    emojiPopup = createPopup(
      {
        emojiSize: "1.25rem",
        showVariants: false,
        i18n: ja,
      },
      {
        position: {
          top: "3rem",
          right: "3rem",
        },
        hideOnClickOutside: false,
        hideOnEmojiSelect: false,
        showCloseButton: true,
        hideOnEscape: true,
      }
    );
    emojiPopup.addEventListener("emoji:select", (selection) => {
      onInputIcon(selection.emoji);
      emojiPopup?.close();
    });
  });

  const onToggleEmoji = (e: Event) => {
    if (emojiPopup) {
      e.preventDefault();
      emojiPopup.toggle();
    }
  };

  const libraryModalClose = () => {
    emojiPopup?.close();
    modalClose();
  };

  return (
    <>
      <h2 class={componentStyles.heading}>ライブラリ</h2>
      <FloatingButton modalShow={modalShow} />
      <Show
        when={folders().length > 0}
        fallback={<p>フォルダが登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={folders()}>{(folder) => <FolderCard {...folder} />}</For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={modalClose}>
        <AddFolderForm
          error={error}
          isValidForm={isValidForm}
          onInputName={onInputName}
          submit={submit}
          modalClose={libraryModalClose}
          onToggleEmoji={onToggleEmoji}
        />
      </Modal>
    </>
  );
};

export default Library;
