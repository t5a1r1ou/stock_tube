import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  fontFamily:
    "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif",
});

globalStyle(".picmo__popupContainer", {
  width: "80%",
  left: 0,
  right: 0,
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "33%",
      minWidth: 340,
      maxWidth: 450,
    },
  },
});

globalStyle(".picmo__picker", {
  width: "100% !important",
});
