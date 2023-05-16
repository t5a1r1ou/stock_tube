import type { Component } from "solid-js";

import { Title } from "@solidjs/meta";

type Props = {
  title: string;
};

export const Head: Component<Props> = (props) => {
  return <Title>{props.title}</Title>;
};
