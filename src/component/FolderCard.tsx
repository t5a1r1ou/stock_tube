import { Component } from "solid-js";
import { IoSettingsOutline } from "solid-icons/io";
import { Folder } from "../types/types";
import { folderCard } from "../styles/style.css";
import { A } from "@solidjs/router";
import { getFolderVideos } from "../store/videos";

type Props = Folder;

export const FolderCard: Component<Props> = (props) => {
  const videoCounts = () => getFolderVideos(props.id).length;
  return (
    <div class={folderCard.container}>
      <A href={`/library/${props.url_id}`} class={folderCard.card}>
        <div class={folderCard.row}>
          <div>
            <h3 class={folderCard.title}>{props.name}</h3>
            <p>{`${videoCounts()}件`}</p>
          </div>
          <IoSettingsOutline size={24} />
        </div>
        <p class={folderCard.icon}>{props.icon}</p>
      </A>
    </div>
  );
};
