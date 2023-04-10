import { For, Match, Show, Switch, createSignal, onMount } from "solid-js";
import { AiFillEdit } from "solid-icons/ai";
import { Head } from "../layout/Head";
import {
  deletingFolderStore,
  foldersStore,
  savingFolderStore,
  videosStore,
} from "../store";
import {
  useConfirmModal,
  useModal,
  usePicmo,
  useSavingFolder,
} from "../hooks/";
import {
  CardsWrapper,
  DeleteConfirm,
  EditFolderForm,
  FolderCard,
  Modal,
  Spinner,
} from "../component";
import { componentStyles } from "../styles/style.css";
import type { Component } from "solid-js";
import type { PopupPickerController } from "@picmo/popup-picker";
import type { Folder } from "../types/types";

const Library: Component = () => {
  const editFolderModalId = "editFolder_modal";
  const confirmModalId = "confirm_modal";
  const [loadingVideo, setLoadingVideo] = createSignal<boolean>(true);
  const [loadingFolder, setLoadingFolder] = createSignal<boolean>(true);
  const [modalType, setModalType] = createSignal<"new" | "edit" | undefined>(
    undefined
  );
  const [isEditMode, setIsEditMode] = createSignal<boolean>(false);
  const { modalShow: editFormModalShow, modalClose: editFormModalClose } =
    useModal(editFolderModalId);
  const { modalShow: confirmModalShow, modalClose: confirmModalClose } =
    useModal(confirmModalId);
  let emojiPopup: PopupPickerController | undefined;
  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();
  const { createPicmo, registerListener, toggleEmoji } = usePicmo();
  const { onConfirmFolderModalShow, onConfirmFolderModalDelete } =
    useConfirmModal({
      modalShow: confirmModalShow,
      modalClose: confirmModalClose,
    });

  onMount(() => {
    if (videosStore.data.length > 0 && foldersStore.data.length > 0) {
      setLoadingFolder(false);
      setLoadingVideo(false);
    } else {
      videosStore.fetchData(() => setLoadingVideo(false));
      foldersStore.fetchData(() => setLoadingFolder(false));
    }
    emojiPopup = createPicmo();
    registerListener(emojiPopup, inputIcon);
  });

  const onToggleEmoji = (e: Event) => toggleEmoji(e, emojiPopup);

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
    editFormModalShow();
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
    editFormModalShow();
  };

  const libraryEditFormModalClose = () => {
    emojiPopup?.close();
    editFormModalClose();
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
              <AiFillEdit color="#666" />
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
                  editModalShow={editModalShow}
                  confirmModalShow={onConfirmFolderModalShow}
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
          <span class={componentStyles.visuallyHidden}>フォルダを追加</span>
        </button>
      </Show>
      <Modal
        id={editFolderModalId}
        modalClose={libraryEditFormModalClose}
        fullWidth={false}
      >
        <EditFolderForm
          modalType={modalType()}
          error={error}
          isValidForm={isValidForm}
          inputName={inputName}
          submit={submit}
          modalClose={libraryEditFormModalClose}
          onToggleEmoji={onToggleEmoji}
        />
      </Modal>
      <Modal
        id={confirmModalId}
        modalClose={confirmModalClose}
        fullWidth={false}
      >
        <DeleteConfirm
          modalClose={confirmModalClose}
          onDelete={onConfirmFolderModalDelete}
          title={`${deletingFolderStore.data.name}フォルダを削除しますか？`}
          desc={"保存している動画も削除されます。"}
        />
      </Modal>
    </>
  );
};

export default Library;
