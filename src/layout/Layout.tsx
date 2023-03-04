import type { JSX, Component } from "solid-js";
import { footer, footerText, header, heading, wrapper } from "./Layout.css";

type Props = {
  children: JSX.Element;
};

const Layout: Component<Props> = ({ children }) => {
  return (
    <div class={wrapper}>
      <header class={header}>
        <h1 class={heading}>StockTube</h1>
      </header>
      <main>{children}</main>
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
