import { Match, Show, Switch, createSignal, splitProps } from "solid-js";
import { A } from "@solidjs/router";
import { FiEdit } from "solid-icons/fi";
import { AiFillDelete } from "solid-icons/ai";
import { BsThreeDots } from "../lib/solid-icons/BsThreeDots";
import { foldersStore, videosStore } from "../store/";
import { componentStyles, folderCard } from "../styles/style.css";
// @ts-ignore
import clickOutside from "../directives/clickOutside";
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
  const [isMenuOpened, setIsMenuOpened] = createSignal<boolean>(false);
  const videoCounts = () => videosStore.getFromFolder(folder.id).length;
  const folderCounts = () => foldersStore.data.length;
  const LAST_ONE = 1;
  let firstMenuItem: HTMLLIElement | undefined;

  const onClickEdit = (e: Event) => {
    e.preventDefault();
    fnc.editModalShow(folder);
  };

  const onClickDelete = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    fnc.confirmModalShow(folder);
  };

  const onClickEditMenuItem = (e: Event) => {
    setIsMenuOpened(false);
    onClickEdit(e);
  };

  const onClickDeleteMenuItem = (e: Event) => {
    setIsMenuOpened(false);
    onClickDelete(e);
  };

  const onClickMenu = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    if (isMenuOpened()) {
      setIsMenuOpened(false);
      (target as HTMLElement).focus();
    } else if (!isMenuOpened()) {
      setIsMenuOpened(true);
      (target as HTMLElement).blur();
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
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
              </div>
            </div>
            <p class={folderCard.icon}>{folder.icon}</p>
            <Show when={folderCounts() !== LAST_ONE}>
              <button class={folderCard.deleteButton} onClick={onClickDelete}>
                <span class={componentStyles.visuallyHidden}>削除</span>
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
            <div
              class={folderCard.menuButtonContainer}
              use:clickOutside={() => setIsMenuOpened(false)}
            >
              <button
                class={folderCard.menuButton}
                onClick={onClickMenu}
                id={folder.id}
                aria-haspopup={true}
                aria-controls={`${folder.id}_menu`}
                aria-expanded={isMenuOpened()}
              >
                <BsThreeDots className={folderCard.menuButtonIcon} />
              </button>
              <ul
                id={`${folder.id}_menu`}
                class={folderCard.menu}
                role="menu"
                aria-labelledby={folder.id}
              >
                <li
                  role="menuitem"
                  ref={firstMenuItem}
                  class={folderCard.menuItem}
                  onClick={onClickEditMenuItem}
                >
                  <FiEdit class={folderCard.menuIcon} />
                  <span>編集</span>
                </li>
                <li
                  role="menuitem"
                  class={folderCard.menuItemDelete}
                  onClick={onClickDeleteMenuItem}
                >
                  <AiFillDelete class={folderCard.menuIcon} />
                  <span>削除</span>
                </li>
              </ul>
            </div>
          </A>
        </div>
      </Match>
    </Switch>
  );
};
