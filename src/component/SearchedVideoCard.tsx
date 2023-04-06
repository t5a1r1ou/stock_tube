import { Component, Show } from "solid-js";
import { videosStore } from "../store/";
import { videoCard } from "../styles/style.css";
import type { Video } from "../types/types";

type Props = {
  video: Video;
  modalShow: (video: Video) => void;
};

export const SearchedVideoCard: Component<Props> = (props) => {
  const isStocked = () =>
    videosStore.data
      .map((video) => video.youtube_id)
      .includes(props.video.youtube_id);

  const onModalShow = () => props.modalShow(props.video);

  return (
    <div class={videoCard.container}>
      <div class={videoCard.contentWrapper}>
        <div class={videoCard.imgContainer}>
          <img
            src={props.video.thumbnail}
            alt={`サムネイル: ${props.video.title}`}
            class={videoCard.img}
          />
        </div>
        <h3 class={videoCard.title}>{props.video.title}</h3>
        <time datetime={props.video.published_at} class={videoCard.publishedAt}>
          公開日: {props.video.published_at.split("T").at(0)}
        </time>
      </div>
      <Show when={!isStocked()} fallback={<p>追加済み</p>}>
        <button class={videoCard.button} onClick={onModalShow}>
          追加する
        </button>
      </Show>
    </div>
  );
};
