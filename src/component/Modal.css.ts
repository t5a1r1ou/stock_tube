import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "none",
  selectors: {
    "&[aria-hidden='false']": {
      display: "block",
    },
  },
});

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const container = style({
  width: "80%",
  maxWidth: "800px",
  padding: "1rem",
  backgroundColor: "#fff",
});
