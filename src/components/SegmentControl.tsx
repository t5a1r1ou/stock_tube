import { For } from "solid-js";
import type { Component } from "solid-js";
import { componentStyles } from "../styles/style.css";

type Props = {
  id: string;
  data: {
    value: string;
    text: string;
  }[];
  state: string;
  onChange: (e: { currentTarget: HTMLInputElement }) => void;
};

export const SegmentControl: Component<Props> = (props) => {
  return (
    <div class={componentStyles.segmentControl.wrapper}>
      <For each={props.data}>
        {(data) => (
          <>
            <input
              type="radio"
              name={props.id}
              id={data.value}
              value={data.value}
              checked={props.state === data.value}
              onChange={props.onChange}
              class={componentStyles.hiddenText}
            />
            <label
              for={data.value}
              class={componentStyles.segmentControl.button}
              data-checked={props.state === data.value}
            >
              {data.text}
            </label>
          </>
        )}
      </For>
    </div>
  );
};
