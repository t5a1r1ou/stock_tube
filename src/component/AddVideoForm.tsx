import { Component } from "solid-js";
import { Video } from "../types/types";
import { searchForm, card, commonStyles } from "../styles/style.css";

type Props = {
  video: Video;
};

export const AddVideoForm: Component<Props> = (props) => {
  return (
    <div class={card.container}>
      <img
        class={card.img}
        src={props.video.thumbnail}
        alt={`サムネイル: ${props.video.title}`}
      />
      <h3 class={card.title}>{props.video.title}</h3>
      <p class={card.publishedAt}>
        公開日: {props.video.publishedAt.split("T").at(0)}
      </p>
      <form class={searchForm.container}>
        <input
          type="text"
          name="folder"
          placeholder="保存するフォルダを入力"
          class={commonStyles.input}
        />
        <button class={searchForm.submitButton}>保存する</button>
      </form>
    </div>
  );
};
