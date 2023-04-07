import { Component, For, Show, onMount } from "solid-js";
import { PopupPickerController, createPopup } from "@picmo/popup-picker";
import { AiFillFolderAdd } from "solid-icons/ai";
import { Head } from "../layout/Head";
import { foldersStore, videosStore } from "../store";
import { useModal, useSavingFolder } from "../hooks/";
import ja from "../lib/picmo/lang-ja";
import { CardsWrapper, EditFolderForm, FolderCard, Modal } from "../component";
import { componentStyles } from "../styles/style.css";

const Library: Component = () => {
  const modalId = "library_modal";
  const { modalShow, modalClose } = useModal(modalId);
  let emojiPopup: PopupPickerController | undefined;
  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();

  onMount(() => {
    videosStore.fetchData();
    foldersStore.fetchData();
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
      inputIcon(selection.emoji);
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
      <Head title="StockTube | ライブラリ" />
      <h2 class={componentStyles.heading}>
        ライブラリ
        <span
          class={componentStyles.headingSideButton}
          role="button"
          onClick={modalShow}
        >
          追加
          <AiFillFolderAdd color="#999"></AiFillFolderAdd>
        </span>
      </h2>
      <Show
        when={foldersStore.data.length > 0}
        fallback={<p>フォルダが登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={foldersStore.data}>
            {(folder) => (
              <FolderCard {...folder} onDelete={foldersStore.removeFolder} />
            )}
          </For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={libraryModalClose} fullWidth={false}>
        <EditFolderForm
          error={error}
          isValidForm={isValidForm}
          inputName={inputName}
          submit={submit}
          modalClose={libraryModalClose}
          onToggleEmoji={onToggleEmoji}
        />
      </Modal>
    </>
  );
};

export default Library;
