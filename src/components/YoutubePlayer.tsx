import { youtubePlayer } from "../styles/style.css";
import type { Component } from "solid-js";

type Props = {
  id: string;
};

export const YoutubePlayer: Component<Props> = (props) => {
  return (
    <div class={youtubePlayer.container}>
      <div id={props.id}></div>
    </div>
  );
};
