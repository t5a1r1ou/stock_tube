import type { Component } from "solid-js";
import { cardContainer, cardImg } from "./Card.css";

type Props = {
  youtubeId: string;
};

const Card: Component<Props> = ({ youtubeId }) => {
  return (
    <div class={cardContainer}>
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt="サムネイル"
        class={cardImg}
      />
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
