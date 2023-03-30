import { Component } from "solid-js";
import { videoCard } from "../styles/style.css";
import type { Video } from "../types/types";
import youtubeIcon from "../images/youtube_icon.png";

type Props = Video & {
  onDelete: (id: Video["youtube_id"]) => void;
  modalShow: (id: Video["youtube_id"]) => void;
  iframeId: string;
};

const VideoCard: Component<Props> = (props) => {
  const video: Video = {
    youtube_id: props.youtube_id,
    thumbnail: props.thumbnail,
    title: props.title,
    published_at: props.published_at,
  };

  return (
    <div class={videoCard.container}>
      <div class={videoCard.contentWrapper}>
        <div
          class={videoCard.imgContainer}
          onClick={() => props.modalShow(props.youtube_id)}
        >
          <img
            src={props.thumbnail}
            alt={`サムネイル: ${props.title}`}
            class={videoCard.img}
          />
          <img src={youtubeIcon} alt="" class={videoCard.youtubeIcon} />
        </div>
        <h3 class={videoCard.title}>{props.title}</h3>
        <time datetime={props.published_at} class={videoCard.publishedAt}>
          公開日: {props.published_at.split("T").at(0)}
        </time>
      </div>
      <button
        class={videoCard.button}
        onClick={() => props.onDelete(video.youtube_id)}
      >
        削除する
      </button>
    </div>
  );
};

export default VideoCard;
