import { Accessor, JSX, Match, Show, Switch } from "solid-js";
import { layoutStyles } from "../styles/style.css";
import type { Component } from "solid-js";
import { User } from "@supabase/supabase-js";
import { A, useLocation } from "@solidjs/router";

type Props = {
  children: JSX.Element;
  user: Accessor<User | null>;
  signOut: () => void;
};

const Layout: Component<Props> = (props) => {
  const location = useLocation();
  const isSearchPage = () => location.pathname.includes("search");
  const isVideoPage = () => location.pathname.includes("library");
  return (
    <div class={layoutStyles.wrapper}>
      <header class={layoutStyles.header}>
        <div class={layoutStyles.headerContainer}>
          <Switch>
            <Match when={isSearchPage()}>
              <A
                href="/library"
                role="button"
                class={layoutStyles.headerLeftButton}
              >
                ライブラリ
              </A>
            </Match>
            <Match when={isVideoPage()}>
              <A
                href="/search"
                role="button"
                class={layoutStyles.headerLeftButton}
              >
                検索
              </A>
            </Match>
          </Switch>
          <h1 class={layoutStyles.headerTitle}>StockTube</h1>
          <Show when={props.user()}>
            <button
              onClick={() => props.signOut()}
              class={layoutStyles.headerRightButton}
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
