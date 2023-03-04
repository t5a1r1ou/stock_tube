import { style } from "@vanilla-extract/css";

export const wrapperClass = style({
  minHeight: "100vh",
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
});

export const headerClass = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "4rem",
  backgroundColor: "#cccccc",
});

export const headingClass = style({
  fontSize: "1.6rem",
  textAlign: "center",
});

export const footerClass = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "4rem",
  borderTop: "2px solid #ccc",
});

export const footerTextClass = style({
  fontSize: "1.1rem",
  color: "#ccc",
});
