import { Component, Match, Show, Switch } from "solid-js";
import { card } from "../styles/style.css";
import type { Video } from "../types/types";
import { useLocation } from "@solidjs/router";

type Props = Video & {
  onClickAdd: (video: Video) => void;
  onClickDelete: (id: Video["youtubeId"]) => void;
  modalShow?: (video: Video) => void;
};

const Card: Component<Props> = (props) => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const video: Video = {
    youtubeId: props.youtubeId,
    thumbnail: props.thumbnail,
    title: props.title,
    publishedAt: props.publishedAt,
    isStocked: props.isStocked,
  };

  const onModalShow = () => {
    if (props.modalShow) {
      props.modalShow(video);
    }
  };

  return (
    <div class={card.container}>
      <div>
        <img
          src={props.thumbnail}
          alt={`サムネイル: ${props.title}`}
          class={card.img}
        />
        <h3 class={card.title}>{props.title}</h3>
        <time datetime={props.publishedAt} class={card.publishedAt}>
          公開日: {props.publishedAt.split("T").at(0)}
        </time>
      </div>
      <Switch>
        <Match when={isSearchPage}>
          <Show when={!props.isStocked} fallback={<p>追加済み</p>}>
            <button class={card.button} onClick={onModalShow}>
              追加する
            </button>
          </Show>
        </Match>
        <Match when={!isSearchPage}>
          <button
            class={card.button}
            onClick={() => props.onClickDelete(video.youtubeId)}
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
