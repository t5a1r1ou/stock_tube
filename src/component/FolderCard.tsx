import { Accessor, Component, Match, Show, Switch, splitProps } from "solid-js";
import { A } from "@solidjs/router";
import { foldersStore, videosStore } from "../store/";
import { folderCard, mixin } from "../styles/style.css";
import type { Folder } from "../types/types";
import { IoSettingsOutline } from "solid-icons/io";

type Props = Folder & {
  modalShow: (folder: Folder) => void;
  isEditMode: Accessor<boolean>;
  onDelete: (id: Folder["id"]) => void;
};

export const FolderCard: Component<Props> = (props) => {
  const [fnc, folder] = splitProps(props, ["onDelete", "modalShow"]);
  const videoCounts = () => videosStore.getFromFolder(folder.id).length;
  const folderCounts = () => foldersStore.data.length;
  const LAST_ONE = 1;

  const onClickEdit = (e: Event) => {
    e.preventDefault();
    fnc.modalShow(folder);
  };

  const onClickDelete = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`${folder.name}フォルダを削除してよろしいですか？`)) {
      fnc.onDelete(folder.id);
    }
  };

  return (
    <Switch>
      <Match when={props.isEditMode() === true}>
        <div class={folderCard.editContainer}>
          <div role="button" class={folderCard.card} onClick={onClickEdit}>
            <div class={folderCard.infoContainer}>
              <div class={folderCard.row}>
                <div>
                  <h3 class={folderCard.title}>{folder.name}</h3>
                  <p>{`${videoCounts()}件`}</p>
                </div>
                <div class={folderCard.editIcon}>
                  <IoSettingsOutline size={24} />
                </div>
              </div>
            </div>
            <p class={folderCard.icon}>{folder.icon}</p>
            <Show when={folderCounts() !== LAST_ONE}>
              <button class={folderCard.deleteButton} onClick={onClickDelete}>
                <span class={mixin.visuallyHidden}>削除</span>
              </button>
            </Show>
          </div>
        </div>
      </Match>
      <Match when={props.isEditMode() === false}>
        <div class={folderCard.container}>
          <A href={`/library/${folder.url_id}`} class={folderCard.card}>
            <div class={folderCard.infoContainer}>
              <div class={folderCard.row}>
                <div>
                  <h3 class={folderCard.title}>{folder.name}</h3>
                  <p>{`${videoCounts()}件`}</p>
                </div>
              </div>
            </div>
            <p class={folderCard.icon}>{folder.icon}</p>
          </A>
        </div>
      </Match>
    </Switch>
  );
};
