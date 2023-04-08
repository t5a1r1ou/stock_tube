import { For, Match, Show, Switch, createSignal, onMount } from "solid-js";
import { PopupPickerController, createPopup } from "@picmo/popup-picker";
import { AiFillEdit } from "solid-icons/ai";
import { Head } from "../layout/Head";
import { foldersStore, savingFolderStore, videosStore } from "../store";
import { useModal, useSavingFolder } from "../hooks/";
import ja from "../lib/picmo/lang-ja";
import {
  CardsWrapper,
  EditFolderForm,
  FolderCard,
  Modal,
  Spinner,
} from "../component";
import { componentStyles, mixin } from "../styles/style.css";
import type { Component } from "solid-js";
import type { Folder } from "../types/types";

const Library: Component = () => {
  const modalId = "library_modal";
  const [loadingVideo, setLoadingVideo] = createSignal<boolean>(true);
  const [loadingFolder, setLoadingFolder] = createSignal<boolean>(true);
  const [modalType, setModalType] = createSignal<"new" | "edit" | undefined>(
    undefined
  );
  const [isEditMode, setIsEditMode] = createSignal<boolean>(false);
  const { modalShow, modalClose } = useModal(modalId);
  let emojiPopup: PopupPickerController | undefined;
  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();

  onMount(() => {
    videosStore.fetchData(() => setLoadingVideo(false));
    foldersStore.fetchData(() => setLoadingFolder(false));
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
    if (!modalType() || modalType() === "edit") {
      setModalType("new");
      savingFolderStore.clearData();
    }
    modalShow();
  };

  const editModalShow = (folder: Folder) => {
    if (!modalType() || modalType() === "new") {
      setModalType("edit");
    }
    if (
      savingFolderStore.data.id === "" ||
      folder.id !== savingFolderStore.data.id
    ) {
      savingFolderStore.setData({
        ...folder,
        // savingFolderStoreにidの値が格納されている場合は編集モードになる
        id: folder.id,
      });
    }
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
              <AiFillEdit color="#0044CC" />
            </span>
          </Match>
          <Match when={!isEditMode()}>
            <span
              class={componentStyles.headingSideButton}
              role="button"
              onClick={onToggleMode}
            >
              編集
              <AiFillEdit color="#999" />
            </span>
          </Match>
        </Switch>
      </h2>
      <Show when={!loadingVideo() && !loadingFolder()} fallback={<Spinner />}>
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
        <button
          class={componentStyles.floatingButton.container}
          onClick={newModalShow}
        >
          <div class={componentStyles.floatingButton.iconAdd}></div>
          <span class={mixin.visuallyHidden}>フォルダを追加</span>
        </button>
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
