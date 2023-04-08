import { videoCard } from "../styles/style.css";
import youtubeIcon from "../images/youtube_icon.png";
import type { Component } from "solid-js";
import type { Video } from "../types/types";

type Props = {
  video: Video;
  onDelete: (id: Video["youtube_id"]) => void;
  modalShow: (id: Video["youtube_id"]) => void;
  iframeId: string;
};

export const VideoCard: Component<Props> = (props) => {
  return (
    <div class={videoCard.container}>
      <div class={videoCard.contentWrapper}>
        <div
          class={videoCard.imgContainer}
          onClick={() => props.modalShow(props.video.youtube_id)}
        >
          <img
            src={props.video.thumbnail}
            alt={`サムネイル: ${props.video.title}`}
            class={videoCard.img}
          />
          <img src={youtubeIcon} alt="" class={videoCard.youtubeIcon} />
        </div>
        <h3 class={videoCard.title}>{props.video.title}</h3>
        <time datetime={props.video.published_at} class={videoCard.publishedAt}>
          公開日: {props.video.published_at.split("T").at(0)}
        </time>
      </div>
      <button
        class={videoCard.button}
        onClick={() => props.onDelete(props.video.youtube_id)}
      >
        削除する
      </button>
    </div>
  );
};
