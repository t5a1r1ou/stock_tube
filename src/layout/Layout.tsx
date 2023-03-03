import { JSX } from "solid-js";

import classes from "./Layout.module.css";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <h1 class={classes.heading}>StockTube</h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
