import { Accessor, JSX, Show } from "solid-js";
import { commonStyles } from "../styles/style.css";
import type { Component } from "solid-js";
import { User } from "@supabase/supabase-js";

type Props = {
  children: JSX.Element;
  user: Accessor<User | null>;
  signOut: () => void;
};

const Layout: Component<Props> = (props) => {
  return (
    <div class={commonStyles.wrapper}>
      <header class={commonStyles.header}>
        <div class={commonStyles.headerContainer}>
          <h1 class={commonStyles.headerTitle}>StockTube</h1>
          <Show when={props.user()}>
            <button
              onClick={() => props.signOut()}
              class={commonStyles.headerButton}
            >
              サインアウト
            </button>
          </Show>
        </div>
      </header>
      <main class={commonStyles.main}>{props.children}</main>
      <footer class={commonStyles.footer}>
        <small class={commonStyles.footerText}>
          <a href="https://github.com/t5a1r1ou" target="_blank">
            &copy;t5a1r1ou
          </a>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
