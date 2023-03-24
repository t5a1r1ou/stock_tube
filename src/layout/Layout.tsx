import { JSX } from "solid-js";
import {
  footer,
  footerText,
  header,
  headerContainer,
  authButton,
  title,
  main,
  wrapper,
} from "./Layout.css";
import type { Component } from "solid-js";

type Props = {
  children: JSX.Element;
  onClickAuthButton: () => void;
  buttonText: "サインイン" | "サインアウト";
};

const Layout: Component<Props> = (props) => {
  return (
    <div class={wrapper}>
      <header class={header}>
        <div class={headerContainer}>
          <h1 class={title}>StockTube</h1>
          <button onClick={() => props.onClickAuthButton()} class={authButton}>
            {props.buttonText}
          </button>
        </div>
      </header>
      <main class={main}>{props.children}</main>
      <footer class={footer}>
        <small class={footerText}>
          <a href="https://github.com/t5a1r1ou" target="_blank">
            &copy;t5a1r1ou
          </a>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
