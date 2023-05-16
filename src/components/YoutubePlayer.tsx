import type { Component } from "solid-js";

import { youtubePlayer } from "../styles/style.css";

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
