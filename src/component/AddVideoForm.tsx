import { Component } from "solid-js";
import { Video } from "../types/types";
import { cardContainer, cardImg, cardPublishedAt, cardTitle } from "./Card.css";
import { input } from "../styles/utility.css";
import { container, submitButton } from "./SearchForm.css";

type Props = {
  video: Video;
};

export const AddVideoForm: Component<Props> = (props) => {
  return (
    <div class={cardContainer}>
      <img
        class={cardImg}
        src={props.video.thumbnail}
        alt={`サムネイル: ${props.video.title}`}
      />
      <h3 class={cardTitle}>{props.video.title}</h3>
      <p class={cardPublishedAt}>
        公開日: {props.video.publishedAt.split("T").at(0)}
      </p>
      <form class={container}>
        <input
          type="text"
          name="folder"
          placeholder="保存するフォルダを入力"
          class={input}
        />
        <button class={submitButton}>保存する</button>
      </form>
    </div>
  );
};
