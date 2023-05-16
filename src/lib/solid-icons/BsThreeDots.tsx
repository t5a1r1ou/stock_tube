import type { Component } from "solid-js";

type Props = {
  color?: string;
  className?: string;
};

export const BsThreeDots: Component<Props> = (
  props = { color: "currentColor", className: "" },
) => {
  return (
    <svg
      fill={props.color}
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      style="overflow: visible;"
      class={props.className}
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
    </svg>
  );
};
