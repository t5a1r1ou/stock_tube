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
import type { Component, Accessor } from "solid-js";
import { Session } from "@supabase/gotrue-js";

type Props = {
  children: JSX.Element;
  signIn: () => void;
  signOut: () => void;
  session: Accessor<Session | null>;
};

const Layout: Component<Props> = ({ children, signIn, signOut, session }) => {
  return (
    <div class={wrapper}>
      <header class={header}>
        <div class={headerContainer}>
          <h1 class={title}>StockTube</h1>
          <button
            onClick={session() ? () => signOut() : () => signIn()}
            class={authButton}
          >
            {session() ? "サインアウト" : "サインイン"}
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
