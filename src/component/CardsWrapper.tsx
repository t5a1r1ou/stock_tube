import { For } from "solid-js";
import type { Component } from "solid-js";
import { wrapper } from "./CardsWrapper.css";
import { Video } from "../types/types";
import Card from "./Card";

type Props = {
  videos: Video[];
};

export const CardsWrapper: Component<Props> = (props) => {
  return (
    <div class={wrapper}>
      <For each={props.videos}>
        {(video) => (
          <Card
            title={video.title}
            publishedAt={video.publishedAt}
            id={video.id}
            thumbnail={video.thumbnail}
          />
        )}
      </For>
    </div>
  );
};
