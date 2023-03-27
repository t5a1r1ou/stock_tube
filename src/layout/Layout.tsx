import { Accessor, JSX, Show } from "solid-js";
import { layoutStyles } from "../styles/style.css";
import type { Component } from "solid-js";
import { User } from "@supabase/supabase-js";

type Props = {
  children: JSX.Element;
  user: Accessor<User | null>;
  signOut: () => void;
};

const Layout: Component<Props> = (props) => {
  return (
    <div class={layoutStyles.wrapper}>
      <header class={layoutStyles.header}>
        <div class={layoutStyles.headerContainer}>
          <h1 class={layoutStyles.headerTitle}>StockTube</h1>
          <Show when={props.user()}>
            <button
              onClick={() => props.signOut()}
              class={layoutStyles.headerButton}
            >
              サインアウト
            </button>
          </Show>
        </div>
      </header>
      <main class={layoutStyles.main}>{props.children}</main>
      <footer class={layoutStyles.footer}>
        <small class={layoutStyles.footerText}>
          <a href="https://github.com/t5a1r1ou" target="_blank">
            &copy;t5a1r1ou
          </a>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
