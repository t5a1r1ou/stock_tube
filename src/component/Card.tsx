import type { Component } from "solid-js";
import { createSignal } from "solid-js";

type Props = {
  youtubeId: string;
};

const Card: Component<Props> = ({ youtubeId }) => {
  const [isThumbnail, setIsThumbnail] = createSignal<boolean>(false);

  return isThumbnail() ? (
    <img
      src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
      onclick={() => setIsThumbnail(false)}
      alt="サムネイル"
    />
  ) : (
    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen={true}
    ></iframe>
  );
};

export default Card;
