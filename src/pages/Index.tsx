import { Component, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Card from "../component/Card";
import { heading } from "./Index.css";
import { input } from "../styles/utility.css";
import { supabase } from "../scripts/supabase";
import { useNavigate } from "@solidjs/router";

type Video = {
  id: string;
};

export const Index: Component = () => {
  const navigate = useNavigate();
  createEffect(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw Error;
    }
    if (!data.session?.user) {
      navigate("/signin");
    }
  }, []);
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
