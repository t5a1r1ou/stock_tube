import { Match, Show, Switch } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { AiFillFolderOpen, AiOutlineSearch } from "solid-icons/ai";
import { Toaster } from "solid-toast";
import { componentStyles, layoutStyles } from "../styles/style.css";
import logo from "../images/logo.png";
import type { Accessor, Component, JSX } from "solid-js";
import type { User } from "@supabase/supabase-js";

type Props = {
  children: JSX.Element;
  user: Accessor<User | null>;
  signOut: () => void;
};

const Layout: Component<Props> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = () => location.pathname === "/";
  const isVideoPage = () => location.pathname.includes("library");
  return (
    <div class={layoutStyles.wrapper}>
      <header class={layoutStyles.header}>
        <div class={layoutStyles.headerContainer}>
          <Show when={props.user()}>
            <Switch>
              <Match when={isSearchPage()}>
                <A
                  href="/library"
                  role="button"
                  class={layoutStyles.headerLeftButton}
                >
                  <AiFillFolderOpen />
                  <span class={componentStyles.hiddenText}>ライブラリ</span>
                </A>
              </Match>
              <Match when={isVideoPage()}>
                <A href="/" role="button" class={layoutStyles.headerLeftButton}>
                  <AiOutlineSearch />
                  <span class={componentStyles.hiddenText}>検索</span>
                </A>
              </Match>
            </Switch>
          </Show>
          <h1 class={layoutStyles.headerTitle}>
            <A href={props.user() ? "/library" : "/"}>
              <img
                src={logo}
                alt="StockTube"
                class={layoutStyles.headerLogo}
                width="500"
                height="200"
              />
            </A>
          </h1>
          <Switch>
            <Match when={props.user()}>
              <button
                onClick={() => props.signOut()}
                class={layoutStyles.headerRightButton}
              >
                サインアウト
              </button>
            </Match>
            <Match when={!props.user()}>
              <button
                onClick={() => navigate("/signin")}
                class={layoutStyles.headerRightButton}
              >
                サインイン
              </button>
            </Match>
          </Switch>
        </div>
      </header>
      <main class={layoutStyles.main}>
        <Toaster />
        {props.children}
      </main>
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
