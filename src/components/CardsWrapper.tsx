import type { Component, JSX } from "solid-js";
import { cardsWrapper } from "../styles/style.css";

type Props = {
  children: JSX.Element;
};

export const CardsWrapper: Component<Props> = (props) => {
  return <div class={cardsWrapper.wrapper}>{props.children}</div>;
};
