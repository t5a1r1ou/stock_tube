import { Accessor, JSX } from "solid-js";
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
  buttonText: Accessor<"サインイン" | "サインアウト">;
};

const Layout: Component<Props> = ({
  children,
  onClickAuthButton,
  buttonText,
}) => {
  return (
    <div class={wrapper}>
      <header class={header}>
        <div class={headerContainer}>
          <h1 class={title}>StockTube</h1>
          <button onClick={() => onClickAuthButton()} class={authButton}>
            {buttonText}
          </button>
        </div>
      </header>
      <main class={main}>{children}</main>
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
