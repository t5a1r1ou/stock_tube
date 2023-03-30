import { Component, Match, Show, Switch } from "solid-js";
import { videoCard } from "../styles/style.css";
import type { Video } from "../types/types";

type Props = Video & {
  onDelete?: (id: Video["youtube_id"]) => void;
  modalShow?: (video: Video) => void;
};

const VideoCard: Component<Props> = (props) => {
  const video: Video = {
    youtube_id: props.youtube_id,
    thumbnail: props.thumbnail,
    title: props.title,
    published_at: props.published_at,
    is_stocked: props.is_stocked,
  };

  const onModalShow = () => {
    if (props.modalShow) {
      props.modalShow(video);
    }
  };

  const onClickDelete = (id: Video["youtube_id"]) => {
    if (props.onDelete) {
      props.onDelete(id);
    }
  };

  return (
    <div class={videoCard.container}>
      <div>
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
      <Switch>
        <Match when={props.modalShow}>
          <Show when={!props.is_stocked} fallback={<p>追加済み</p>}>
            <button class={videoCard.button} onClick={onModalShow}>
              追加する
            </button>
          </Show>
        </Match>
        <Match when={props.onDelete}>
          <button
            class={videoCard.button}
            onClick={() => onClickDelete(video.youtube_id)}
          >
            削除する
          </button>
        </Match>
      </Switch>
      {/* <p>{id}</p> */}
      {/* <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen={true}
        ></iframe> */}
    </div>
  );
};

export default VideoCard;
