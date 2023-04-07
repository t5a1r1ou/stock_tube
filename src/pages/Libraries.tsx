import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createSignal,
  onMount,
} from "solid-js";
import { PopupPickerController, createPopup } from "@picmo/popup-picker";
import { AiFillFolderAdd } from "solid-icons/ai";
import { Head } from "../layout/Head";
import { foldersStore, savingFolderStore, videosStore } from "../store";
import { useModal, useSavingFolder } from "../hooks/";
import ja from "../lib/picmo/lang-ja";
import { CardsWrapper, EditFolderForm, FolderCard, Modal } from "../component";
import { componentStyles } from "../styles/style.css";
import type { Folder } from "../types/types";

const Library: Component = () => {
  const modalId = "library_modal";
  const [modalType, setModalType] = createSignal<"new" | "edit">("new");
  const [isEditMode, setIsEditMode] = createSignal<boolean>(true);
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

  const buttonClass = () => {
    return isEditMode()
      ? componentStyles.headingSideButton
      : componentStyles.headingSideButton;
  };

  const onToggleMode = () => {
    setIsEditMode(!isEditMode());
    buttonClass();
  };

  const newModalShow = () => {
    setModalType("new");
    savingFolderStore.clearData();
    modalShow();
  };

  const editModalShow = (folder: Folder) => {
    setModalType("edit");
    savingFolderStore.setData(folder);
    modalShow();
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
        <Switch>
          <Match when={isEditMode()}>
            <span
              class={componentStyles.headingSideButtonActive}
              role="button"
              onClick={onToggleMode}
            >
              編集終了
              <AiFillFolderAdd color="#0044CC"></AiFillFolderAdd>
            </span>
          </Match>
          <Match when={!isEditMode()}>
            <span
              class={componentStyles.headingSideButton}
              role="button"
              onClick={newModalShow}
            >
              追加
              <AiFillFolderAdd color="#999"></AiFillFolderAdd>
            </span>
            <span
              class={componentStyles.headingSideButton}
              role="button"
              onClick={onToggleMode}
            >
              編集
              <AiFillFolderAdd color="#999"></AiFillFolderAdd>
            </span>
          </Match>
        </Switch>
      </h2>
      <Show
        when={foldersStore.data.length > 0}
        fallback={<p>フォルダが登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={foldersStore.data}>
            {(folder) => (
              <FolderCard
                {...folder}
                isEditMode={isEditMode}
                modalShow={editModalShow}
                onDelete={foldersStore.removeData}
              />
            )}
          </For>
        </CardsWrapper>
      </Show>
      <Modal id={modalId} modalClose={libraryModalClose} fullWidth={false}>
        <EditFolderForm
          modalType={modalType}
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
