import type { JSX, Component } from "solid-js";
import {
  footerClass,
  footerTextClass,
  headerClass,
  headingClass,
  wrapperClass,
} from "./Layout.css";

type Props = {
  children: JSX.Element;
};

const Layout: Component<Props> = ({ children }) => {
  return (
    <div class={wrapperClass}>
      <header class={headerClass}>
        <h1 class={headingClass}>StockTube</h1>
      </header>
      <main>{children}</main>
      <footer class={footerClass}>
        <small class={footerTextClass}>&copy;t5a1r1ou</small>
      </footer>
    </div>
  );
};

export default Layout;
