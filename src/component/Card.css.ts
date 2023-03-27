import { style } from "@vanilla-extract/css";

export const cardContainer = style({
  width: "100%",
  marginBottom: "2rem",
  aspectRatio: "100 / 56.25",
  wordWrap: "break-word",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "calc(100% / 3)",
      padding: "0.4rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  },
});

export const cardImg = style({
  width: "100%",
});

export const cardTitle = style({
  marginTop: "0.8rem",
  fontSize: "1.2rem",
});

export const cardPublishedAt = style({
  display: "block",
  marginTop: "0.4rem",
  fontSize: "0.8rem",
  color: "#999",
});

export const buttonContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const addButton = style({
  marginTop: "0.8rem",
  padding: "0.8rem 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
});
