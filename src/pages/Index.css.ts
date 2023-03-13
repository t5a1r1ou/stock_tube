import { style } from "@vanilla-extract/css";

export const heading = style({
  marginBottom: "0.4rem",
  fontSize: "1.6rem",
});

export const formContainer = style({
  display: "flex",
  justifyContent: "center",
});

export const submitButton = style({
  marginLeft: "0.4rem",
  padding: "0 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
});

export const cardsWrapper = style({
  display: "flex",
  flexWrap: "wrap",
});

export const pagenation = style({
  display: "flex",
  justifyContent: "center",
  gap: "0.4rem",
  margin: "1.6rem auto",
});

export const pagenationButton = style({
  padding: "0.8rem 1.2rem",
  color: "#fff",
  backgroundColor: "#999",
  borderRadius: "5px",
});
