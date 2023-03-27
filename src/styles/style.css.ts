import { style } from "@vanilla-extract/css";

export const commonStyles = {
  wrapper: style({
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  }),
  header: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "4rem",
    backgroundColor: "#cccccc",
  }),
  headerContainer: style({
    position: "relative",
    width: "100%",
    maxWidth: "800px",
  }),
  headerTitle: style({
    fontSize: "1.6rem",
    textAlign: "center",
  }),
  headerButton: style({
    position: "absolute",
    margin: "auto 0",
    right: "1.4rem",
    top: 0,
    bottom: 0,
    fontSize: "0.8rem",
  }),
  main: style({
    width: "80%",
    maxWidth: "800px",
    margin: "2rem auto 0",
  }),
  footer: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "3rem",
    borderTop: "1px solid #ccc",
  }),
  footerText: style({
    fontSize: "1.1rem",
    color: "#ccc",
  }),
  heading: style({
    marginBottom: "0.4rem",
    fontSize: "1.6rem",
  }),
  input: style({
    border: "1px solid #999",
    borderRadius: "5px",
    width: "100%",
    padding: "0.8rem",
    "@media": {
      "screen and (min-width: 768px)": {
        width: "70%",
      },
    },
  }),
};

const componentStyles = {
  searchForm: {
    container: style({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "@media": {
        "screen and (min-width: 768px)": {
          flexDirection: "row",
        },
      },
    }),
    errorText: style({
      marginTop: "0.8rem",
      textAlign: "center",
      color: "#d9534f",
    }),
    submitButton: style({
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
    }),
    result: style({
      margin: "2rem 0 0.4rem",
    }),
  },
  accountForm: {
    anker: style({
      textDecoration: "underline",
      color: "#0044CC",
    }),
    form: style({
      width: "100%",
    }),
    formContainer: style({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      "@media": {
        "screen and (min-width: 768px)": {
          flexDirection: "row",
        },
      },
    }),
    formField: style({
      marginTop: "3rem",
    }),
    inputLabel: style({
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
    }),
    error: style({
      marginTop: "0.5rem",
      color: "#d9534f",
    }),
    submitButton: style({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "2.5rem",
      border: "1px solid #999",
      borderRadius: "5px",
      color: "#999",
      fontWeight: "bold",
    }),
  },
  pagenation: {
    container: style({
      display: "flex",
      justifyContent: "center",
      gap: "0.4rem",
      margin: "0 auto 1.6rem",
    }),
    button: style({
      padding: "0.8rem 1.2rem",
      color: "#fff",
      backgroundColor: "#999",
      borderRadius: "5px",
    }),
  },
  cardsWrapper: {
    wrapper: style({
      display: "flex",
      flexWrap: "wrap",
    }),
  },
  modal: {
    wrapper: style({
      display: "none",
      selectors: {
        "&[aria-hidden='false']": {
          display: "block",
        },
      },
    }),
    overlay: style({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    container: style({
      width: "80%",
      maxWidth: "800px",
      padding: "1rem",
      backgroundColor: "#fff",
    }),
  },
  card: {
    container: style({
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
    }),
    img: style({
      width: "100%",
    }),
    title: style({
      marginTop: "0.8rem",
      fontSize: "1.2rem",
    }),
    publishedAt: style({
      display: "block",
      marginTop: "0.4rem",
      fontSize: "0.8rem",
      color: "#999",
    }),
    buttonContainer: style({
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }),
    button: style({
      marginTop: "0.8rem",
      padding: "0.8rem 1.2rem",
      color: "#fff",
      backgroundColor: "#999",
      borderRadius: "5px",
    }),
  },
};

export const {
  searchForm,
  accountForm,
  pagenation,
  cardsWrapper,
  modal,
  card,
} = componentStyles;
