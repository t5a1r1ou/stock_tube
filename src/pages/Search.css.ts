import { style } from "@vanilla-extract/css";

export const heading = style({
  marginBottom: "0.4rem",
  fontSize: "1.6rem",
});

export const pagenation = style({
  display: "flex",
  justifyContent: "center",
  gap: "0.4rem",
  margin: "0 auto 1.6rem",
});

export const pagenationButton = style({
  padding: "0.8rem 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
});
