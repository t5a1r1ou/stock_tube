import { Component, Show } from "solid-js";
import { videoCard } from "../styles/style.css";
import type { Video } from "../types/types";
import { getVideos } from "../store/videos";

type Props = Video & {
  modalShow: (video: Video) => void;
};

const SearchedVideoCard: Component<Props> = (props) => {
  const video: Video = {
    youtube_id: props.youtube_id,
    thumbnail: props.thumbnail,
    title: props.title,
    published_at: props.published_at,
  };

  const isStocked = () => {
    const videos = () => getVideos();
    return videos()
      .map((video) => video.youtube_id)
      .includes(props.youtube_id);
  };

  const onModalShow = () => {
    props.modalShow(video);
  };

  return (
    <div class={videoCard.container}>
      <div class={videoCard.contentWrapper}>
        <div class={videoCard.imgContainer}>
          <img
            src={props.thumbnail}
            alt={`サムネイル: ${props.title}`}
            class={videoCard.img}
          />
        </div>
        <h3 class={videoCard.title}>{props.title}</h3>
        <time datetime={props.published_at} class={videoCard.publishedAt}>
          公開日: {props.published_at.split("T").at(0)}
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

export default SearchedVideoCard;
