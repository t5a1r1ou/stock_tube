import { Component, Match, Show, Switch } from "solid-js";
import {
  addButton,
  cardContainer,
  cardImg,
  cardPublishedAt,
  cardTitle,
} from "./Card.css";
import type { Video } from "../types/types";
import { useLocation } from "@solidjs/router";

type Props = Video & {
  onClickAdd: (video: Video) => void;
  onClickDelete: (id: Video["id"]) => void;
};

const Card: Component<Props> = (props) => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const video: Video = {
    id: props.id,
    thumbnail: props.thumbnail,
    title: props.title,
    publishedAt: props.publishedAt,
    isStocked: props.isStocked,
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
      <Switch>
        <Match when={isSearchPage}>
          <Show when={!props.isStocked} fallback={<p>追加済み</p>}>
            <button class={addButton} onClick={() => props.onClickAdd(video)}>
              追加する
            </button>
          </Show>
        </Match>
        <Match when={!isSearchPage}>
          <button
            class={addButton}
            onClick={() => props.onClickDelete(video.id)}
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

export default Card;
