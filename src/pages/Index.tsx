import type { Component } from "solid-js";
import { createStore } from "solid-js/store";
import Card from "../component/Card";
import { heading } from "./Index.css";
import { input } from "../styles/utility.css";

type Video = {
  id: string;
};

export const Index: Component = () => {
  const [videos] = createStore<Video[]>([
    {
      id: "Cx2dkpBxst8",
    },
  ]);

  return (
    <div>
      <h2 class={heading}>Index</h2>
      <form>
        <input type="text" class={input} />
        <button type="submit">追加</button>
      </form>
      {videos.map((video) => (
        <Card youtubeId={video.id} />
      ))}
    </div>
  );
};
