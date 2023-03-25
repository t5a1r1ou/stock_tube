import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    "screen and (min-width: 768px)": {
      marginTop: "0",
      flexDirection: "row",
    },
  },
});

export const errorText = style({
  marginTop: "0.8rem",
  textAlign: "center",
  color: "#d9534f",
});

export const submitButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30%",
  marginTop: "1.6rem",
  padding: "0.8rem 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "auto",
      height: "auto",
      marginTop: "0",
      marginLeft: "0.4rem",
    },
  },
});

export const searchResult = style({
  margin: "2rem 0 0.4rem",
});
