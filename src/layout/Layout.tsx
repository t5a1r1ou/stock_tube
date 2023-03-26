import { Accessor, JSX, Show } from "solid-js";
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
import { User } from "@supabase/supabase-js";

type Props = {
  children: JSX.Element;
  user: Accessor<User | null>;
  signOut: () => void;
};

const Layout: Component<Props> = (props) => {
  console.log(props.user());
  return (
    <div class={wrapper}>
      <header class={header}>
        <div class={headerContainer}>
          <h1 class={title}>StockTube</h1>
          <Show when={props.user()}>
            <button onClick={() => props.signOut()} class={authButton}>
              サインアウト
            </button>
          </Show>
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
