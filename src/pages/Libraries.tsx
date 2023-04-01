import { Component, For, Show, onMount } from "solid-js";
import { fetchFolders, getFolders, removeFolder } from "../store/folders";
import { componentStyles } from "../styles/style.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { FolderCard } from "../component/FolderCard";
import { Modal } from "../component/Modal";
import { useModal } from "../hooks/useModal";
import { EditFolderForm } from "../component/EditFolderForm";
import { FloatingButton } from "../component/FloatingButton";
import { PopupPickerController, createPopup } from "@picmo/popup-picker";
import ja from "../lib/picmo/lang-ja";
import { useSavingFolder } from "../hooks/useSavingFolder";
import { fetchVideos } from "../store/videos";

const Library: Component = () => {
  const folders = () => getFolders();
  const modalId = "library_modal";
  const { modalShow, modalClose } = useModal(modalId);
  let emojiPopup: PopupPickerController | undefined;
  const { error, isValidForm, inputName, inputUrlId, onInputIcon, submit } =
    useSavingFolder();

  onMount(() => {
    fetchVideos();
    fetchFolders();
    emojiPopup = createPopup(
      {
        animate: false,
        emojiSize: "1.2rem",
        showVariants: false,
        showPreview: false,
        i18n: ja,
        locale: "ja",
        autoFocus: "none",
      },
      {
        position: {
          top: "3rem",
        },
        hideOnClickOutside: false,
        hideOnEmojiSelect: true,
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
      <FloatingButton onClick={modalShow} text={"ライブラリを追加する"} />
      <Show
        when={folders().length > 0}
        fallback={<p>フォルダが登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={folders()}>
            {(folder) => <FolderCard {...folder} onDelete={removeFolder} />}
          </For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={libraryModalClose} fullWidth={false}>
        <EditFolderForm
          error={error}
          isValidForm={isValidForm}
          inputName={inputName}
          inputUrlId={inputUrlId}
          submit={submit}
          modalClose={libraryModalClose}
          onToggleEmoji={onToggleEmoji}
        />
      </Modal>
    </>
  );
};

export default Library;
