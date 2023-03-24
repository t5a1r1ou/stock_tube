import { CardsWrapper } from "../component/CardsWrapper";
import { heading } from "./Index.css";
// import { cardsWrapper } from "./.css";
import { Component, createSignal } from "solid-js";

export const Index: Component = () => {
  const [videos] = createSignal([]);
  return (
    <>
      <h2 class={heading}>一覧</h2>
      <CardsWrapper videos={videos()} />
    </>
  );
};
