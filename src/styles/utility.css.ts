import { style } from "@vanilla-extract/css";

export const input = style({
  border: "1px solid #999",
  borderRadius: "5px",
  width: "100%",
  padding: "0.8rem",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "70%",
    },
  },
});
