import { For } from "solid-js";
import type { Component } from "solid-js";
import { cardsWrapper } from "../styles/style.css";
import { Video } from "../types/types";
import Card from "./Card";
import { addVideo, removeVideo } from "../store/videos";

type Props = {
  videos: Video[];
  observeSearchStockedVideo: () => void;
  modalShow?: (video: Video) => void;
};

export const CardsWrapper: Component<Props> = (props) => {
  const onClickAdd = (video: Video) => {
    addVideo(video);
    if (props.observeSearchStockedVideo) {
      props.observeSearchStockedVideo();
    }
  };

  const onClickDelete = (id: Video["youtubeId"]) => {
    removeVideo(id);
    if (props.observeSearchStockedVideo) {
      props.observeSearchStockedVideo();
    }
  };

  return (
    <div class={cardsWrapper.wrapper}>
      <For each={props.videos}>
        {(video) => (
          <Card
            title={video.title}
            publishedAt={video.publishedAt}
            youtubeId={video.youtubeId}
            thumbnail={video.thumbnail}
            isStocked={video.isStocked}
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            modalShow={props.modalShow}
          />
        )}
      </For>
    </div>
  );
};
