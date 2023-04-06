import { Component, Show, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { IoSettingsOutline } from "solid-icons/io";
import { getFolderVideos } from "../store/videos";
import { getFolders } from "../store/folders";
import { folderCard } from "../styles/style.css";
import type { Folder } from "../types/types";

type Props = Folder & {
  onDelete: (id: Folder["id"]) => void;
};

export const FolderCard: Component<Props> = (props) => {
  const [showMenu, setShowMenu] = createSignal<boolean>(false);
  const videoCounts = () => getFolderVideos(props.id).length;
  const folderCounts = () => getFolders().length;
  const LAST_ONE = 1;
  const toggleShow = (e: Event) => {
    e.preventDefault();
    setShowMenu(!showMenu());
  };
  const onClickDelete = (e: Event) => {
    e.preventDefault();
    props.onDelete(props.id);
  };
  return (
    <div class={folderCard.container}>
      <A href={`/library/${props.url_id}`} class={folderCard.card}>
        <div class={folderCard.infoContainer}>
          <div class={folderCard.row}>
            <div>
              <h3 class={folderCard.title}>{props.name}</h3>
              <p>{`${videoCounts()}件`}</p>
            </div>
            <div onClick={toggleShow}>
              <IoSettingsOutline size={24} />
            </div>
          </div>
        </div>
        <p class={folderCard.icon}>{props.icon}</p>
      </A>
      <Show when={showMenu()}>
        <div class={folderCard.buttonContainer}>
          <button class={folderCard.editButton}>編集</button>
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
