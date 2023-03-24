import type { Component } from "solid-js";
import {
  addButton,
  cardContainer,
  cardImg,
  cardPublishedAt,
  cardTitle,
} from "./Card.css";
import type { Video } from "../types/types";

const Card: Component<Video> = ({ title, thumbnail, publishedAt }) => {
  return (
    <div class={cardContainer}>
      <div>
        <img src={thumbnail} alt="サムネイル" class={cardImg} />
        <h3 class={cardTitle}>{title}</h3>
        <time datetime={publishedAt} class={cardPublishedAt}>
          {publishedAt.split("T").at(0)}
        </time>
      </div>
      <button class={addButton}>追加する</button>
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
