import { style } from "@vanilla-extract/css";

export const wrapper = style({
  minHeight: "100vh",
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "4rem",
  backgroundColor: "#cccccc",
});

export const headerContainer = style({
  position: "relative",
  width: "100%",
  maxWidth: "800px",
});

export const title = style({
  fontSize: "1.6rem",
  textAlign: "center",
});

export const authButton = style({
  position: "absolute",
  margin: "auto 0",
  right: "0.4rem",
  top: 0,
  bottom: 0,
});

export const main = style({
  width: "80%",
  maxWidth: "800px",
  margin: "2rem auto 0",
});

export const footer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  borderTop: "1px solid #ccc",
});

export const footerText = style({
  fontSize: "1.1rem",
  color: "#ccc",
});
