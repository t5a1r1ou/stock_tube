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

export const heading = style({
  fontSize: "1.6rem",
  textAlign: "center",
});

export const footer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "3rem",
  borderTop: "2px solid #ccc",
});

export const footerText = style({
  fontSize: "1.1rem",
  color: "#ccc",
});
