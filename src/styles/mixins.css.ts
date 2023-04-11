import { style } from "@vanilla-extract/css";

const mixins = {
  visuallyHidden: style({
    border: "0 !important",
    clip: "rect(0 0 0 0) !important",
    clipPath: "inset(50%) !important",
    height: "1px !important",
    margin: "-1px !important",
    overflow: "hidden !important",
    padding: "0 !important",
    position: "absolute !important" as "absolute",
    whiteSpace: "nowrap !important" as "nowrap",
    width: "1px !important",
  }),
  displayFlexCenter: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
};

export default mixins;
