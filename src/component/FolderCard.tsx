import { Component, Show } from "solid-js";
import { Folder } from "../types/types";
import { folderCard } from "../styles/style.css";
import { A } from "@solidjs/router";
import { getFolderVideos } from "../store/videos";

type Props = Folder;

export const FolderCard: Component<Props> = (props) => {
  const videoCounts = () => getFolderVideos(props.id).length;
  return (
    <div class={folderCard.container}>
      <A href={`/library/${props.id}`} class={folderCard.card}>
        <div>
          <h3 class={folderCard.title}>{props.name}</h3>
          <p>{`${videoCounts()}件`}</p>
          <Show when={props.created_at}>
            <time datetime={props.created_at}>{props.created_at}</time>
          </Show>
        </div>
        <p class={folderCard.icon}>{props.icon}</p>
      </A>
    </div>
  );
};
