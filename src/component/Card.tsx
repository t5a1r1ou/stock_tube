import { Component, Show } from "solid-js";
import {
  addButton,
  cardContainer,
  cardImg,
  cardPublishedAt,
  cardTitle,
} from "./Card.css";
import type { Video } from "../types/types";
import { onClickAdd } from "../store/videos";

type Props = Video & {
  observeSearchStockedVideo?: (id: string) => void;
};

const Card: Component<Props> = (props) => {
  const add = () => {
    if (props.observeSearchStockedVideo) {
      props.observeSearchStockedVideo(props.id);
    }
    onClickAdd(props);
  };

  return (
    <div class={cardContainer}>
      <div>
        <img src={props.thumbnail} alt="サムネイル" class={cardImg} />
        <h3 class={cardTitle}>{props.title}</h3>
        <time datetime={props.publishedAt} class={cardPublishedAt}>
          {props.publishedAt.split("T").at(0)}
        </time>
      </div>
      <Show when={props.observeSearchStockedVideo}>
        <Show when={!props.isStocked} fallback={<p>追加済み</p>}>
          <button class={addButton} onClick={add}>
            追加する
          </button>
        </Show>
      </Show>
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

export default Card;
