import { Component, Show, createSignal, splitProps } from "solid-js";
import { A } from "@solidjs/router";
import { IoSettingsOutline } from "solid-icons/io";
import { foldersStore, videosStore } from "../store/";
import { folderCard } from "../styles/style.css";
import type { Folder } from "../types/types";

type Props = Folder & {
  modalShow: (folder: Folder) => void;
  onDelete: (id: Folder["id"]) => void;
};

export const FolderCard: Component<Props> = (props) => {
  const [fnc, folder] = splitProps(props, ["onDelete", "modalShow"]);
  const [showMenu, setShowMenu] = createSignal<boolean>(false);
  const videoCounts = () => videosStore.getFromFolder(folder.id).length;
  const folderCounts = () => foldersStore.data.length;
  const LAST_ONE = 1;

  const toggleShow = (e: Event) => {
    e.preventDefault();
    setShowMenu(!showMenu());
  };

  const onClickEdit = (e: Event) => {
    e.preventDefault();
    fnc.modalShow(folder);
  };

  const onClickDelete = (e: Event) => {
    e.preventDefault();
    fnc.onDelete(folder.id);
  };

  return (
    <div class={folderCard.container}>
      <A href={`/library/${folder.url_id}`} class={folderCard.card}>
        <div class={folderCard.infoContainer}>
          <div class={folderCard.row}>
            <div>
              <h3 class={folderCard.title}>{folder.name}</h3>
              <p>{`${videoCounts()}件`}</p>
            </div>
            <div onClick={toggleShow}>
              <IoSettingsOutline size={24} />
            </div>
          </div>
        </div>
        <p class={folderCard.icon}>{folder.icon}</p>
      </A>
      <Show when={showMenu()}>
        <div class={folderCard.buttonContainer}>
          <button class={folderCard.editButton} onClick={onClickEdit}>
            編集
          </button>
          <Show when={folderCounts() !== LAST_ONE}>
            <button class={folderCard.deleteButton} onClick={onClickDelete}>
              削除
            </button>
          </Show>
        </div>
      </Show>
    </div>
  );
};
