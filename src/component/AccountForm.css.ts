import { style } from "@vanilla-extract/css";

export const heading = style({
  fontSize: "1.6rem",
});

export const form = style({
  width: "100%",
});

export const formField = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "3rem",
  "@media": {
    "screen and (min-width: 768px)": {
      flexDirection: "row",
    },
  },
});

export const inputLabel = style({
  width: "100%",
  marginBottom: "0.5rem",
  fontSize: "1.2rem",
  color: "#999",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "30%",
      marginRight: "1rem",
      marginBottom: "0",
    },
  },
});

export const input = style({
  border: "1px solid #999",
  borderRadius: "5px",
  width: "100%",
  padding: "0.5rem",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "70%",
    },
  },
});

export const submitButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "2.5rem",
  border: "1px solid #999",
  borderRadius: "5px",
  color: "#999",
  fontWeight: "bold",
});