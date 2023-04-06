import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";

type Props = {
  title: string;
};

export const Head: Component<Props> = (props) => {
  return <Title>{props.title}</Title>;
};
