import { style } from "@vanilla-extract/css";

export const heading = style({
  marginBottom: "0.4rem",
  fontSize: "1.6rem",
});

export const anker = style({
  textDecoration: "underline",
  color: "#0044CC",
});

export const form = style({
  width: "100%",
});

export const formContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  "@media": {
    "screen and (min-width: 768px)": {
      flexDirection: "row",
    },
  },
});

export const formField = style({
  marginTop: "3rem",
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

export const error = style({
  marginTop: "0.5rem",
  color: "#d9534f",
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
