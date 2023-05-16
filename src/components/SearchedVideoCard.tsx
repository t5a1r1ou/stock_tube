import type { Component } from "solid-js";

import type { Video } from "../types/types";

import { Show } from "solid-js";

import { convertTimeString } from "../scripts/util";
import { videosStore } from "../store";
import { videoCard } from "../styles/style.css";

type Props = {
  video: Video;
  addVideoModalShow: (video: Video) => void;
  confirmModalShow: (video: Video) => void;
};

export const SearchedVideoCard: Component<Props> = (props) => {
  const isStocked = () =>
    videosStore.data
      .map((video) => video.youtube_id)
      .includes(props.video.youtube_id);

  const onModalShow = () => props.addVideoModalShow(props.video);

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
        <time datetime={props.video.published_at} class={videoCard.details}>
          公開日: {props.video.published_at.split("T").at(0)}
        </time>
        <p class={videoCard.details}>
          再生時間：
          {convertTimeString(props.video.duration)}
        </p>
      </div>
      <Show
        when={!isStocked()}
        fallback={
          <button
            class={videoCard.alertButton}
            onClick={() => props.confirmModalShow(props.video)}
          >
            削除する
          </button>
        }
      >
        <button class={videoCard.button} onClick={onModalShow}>
          追加する
        </button>
      </Show>
    </div>
  );
};
