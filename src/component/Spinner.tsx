import type { Component } from "solid-js";
import { componentStyles } from "../styles/style.css";

export const Spinner: Component = () => {
  return <div class={componentStyles.spinner}></div>;
};
