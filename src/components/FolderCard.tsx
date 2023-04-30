import { Match, Show, Switch, splitProps } from "solid-js";
import { A } from "@solidjs/router";
import { FiEdit } from "solid-icons/fi";
import { AiFillDelete } from "solid-icons/ai";
import { foldersStore, videosStore } from "../store";
import { Menu } from "../components";
import { componentStyles, folderCard } from "../styles/style.css";
import type { Accessor, Component } from "solid-js";
import type { Folder } from "../types/types";

type Props = Folder & {
  editModalShow: (folder: Folder) => void;
  confirmModalShow: (folder: Folder) => void;
  isEditMode: Accessor<boolean>;
};

export const FolderCard: Component<Props> = (props) => {
  const [fnc, folder] = splitProps(props, [
    "editModalShow",
    "confirmModalShow",
  ]);
  const videoCounts = () => videosStore.getFromFolder(folder.id).length;
  const folderCounts = () => foldersStore.data.length;
  const LAST_ONE = 1;

  const onClickEdit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    fnc.editModalShow(folder);
  };

  const onClickDelete = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    fnc.confirmModalShow(folder);
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
              </div>
            </div>
            <p class={folderCard.icon}>{folder.icon}</p>
            <Show when={folderCounts() !== LAST_ONE}>
              <button class={folderCard.deleteButton} onClick={onClickDelete}>
                <span class={componentStyles.hiddenText}>削除</span>
              </button>
            </Show>
          </div>
        </div>
      </Match>
      <Match when={props.isEditMode() === false}>
        <div class={folderCard.container}>
          <A href={`/library/${folder.url_id}`} class={folderCard.card}>
            <div class={folderCard.infoContainer}>
              <div>
                <h3 class={folderCard.title}>{folder.name}</h3>
                <p>{`${videoCounts()}件`}</p>
              </div>
            </div>
            <p class={folderCard.icon}>{folder.icon}</p>
            <Menu
              id={folder.id}
              containerClass={folderCard.menuButtonContainer}
              positionClass={"leftPc"}
            >
              <li role="menuitem">
                <button
                  onClick={onClickEdit}
                  class={componentStyles.menu.bodyButton}
                >
                  <FiEdit class={componentStyles.menu.menuIcon} />
                  <span class={componentStyles.menu.buttonText}>編集</span>
                </button>
              </li>
              <li role="menuitem">
                <button
                  onClick={onClickDelete}
                  class={componentStyles.menu.bodyButtonDelete}
                >
                  <AiFillDelete class={componentStyles.menu.menuIcon} />
                  <span class={componentStyles.menu.buttonText}>削除</span>
                </button>
              </li>
            </Menu>
          </A>
        </div>
      </Match>
    </Switch>
  );
};
