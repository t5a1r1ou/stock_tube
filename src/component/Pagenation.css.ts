import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  gap: "0.4rem",
  margin: "0 auto 1.6rem",
});

export const button = style({
  padding: "0.8rem 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
});
