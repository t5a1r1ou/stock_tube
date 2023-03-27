import { style } from "@vanilla-extract/css";

export const layoutStyles = {
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
};

export const componentStyles = {
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
  button: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    padding: "0.8rem 1.2rem",
    ":disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  }),
  primary: style({
    border: "1px solid #999",
    color: "#999",
    fontWeight: "bold",
  }),
  secondary: style({
    color: "#fff",
    backgroundColor: "#999",
  }),
  error: style({
    color: "#d9534f",
  }),
  videoContainer: style({
    width: "100%",
    aspectRatio: "100 / 56.25",
  }),
  img: style({
    width: "100%",
  }),
  videoTitle: style({
    marginTop: "0.8rem",
    fontSize: "1.2rem",
  }),
  videoPublishedAt: style({
    display: "block",
    marginTop: "0.4rem",
    fontSize: "0.8rem",
    color: "#999",
  }),
};

const unitStyles = {
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
    errorText: style([
      componentStyles.error,
      {
        marginTop: "0.8rem",
        textAlign: "center",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      componentStyles.secondary,
      {
        width: "30%",
        marginTop: "1.6rem",
        "@media": {
          "screen and (min-width: 768px)": {
            width: "auto",
            height: "auto",
            marginTop: "0",
            marginLeft: "0.4rem",
          },
        },
      },
    ]),
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
    input: style([componentStyles.input]),
    error: style([
      componentStyles.error,
      {
        marginTop: "0.5rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      componentStyles.primary,
      {
        width: "100%",
        height: "2.5rem",
      },
    ]),
  },
  pagenation: {
    container: style({
      display: "flex",
      justifyContent: "center",
      gap: "0.4rem",
      margin: "0 auto 1.6rem",
    }),
    button: style([componentStyles.button, componentStyles.primary]),
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
    container: style([
      componentStyles.videoContainer,
      {
        marginBottom: "2rem",
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
      },
    ]),
    img: style([componentStyles.img]),
    title: style([componentStyles.videoTitle]),
    publishedAt: style([componentStyles.videoPublishedAt]),
    buttonContainer: style({
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }),
    button: style([
      componentStyles.button,
      componentStyles.secondary,
      {
        marginTop: "0.8rem",
      },
    ]),
  },
  addVideoForm: {
    container: style({
      "@media": {
        "screen and (min-width: 768px)": {
          display: "flex",
        },
      },
    }),
    videoWrapper: style([componentStyles.videoContainer]),
    box: style({
      "@media": {
        "screen and (min-width: 768px)": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1.2rem",
        },
      },
    }),
    img: style([componentStyles.img]),
    title: style([
      componentStyles.videoTitle,
      {
        "@media": {
          "screen and (min-width: 768px)": {
            marginTop: 0,
          },
        },
      },
    ]),
    publishedAt: style([componentStyles.videoPublishedAt]),
    formContainer: style({
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "0.8rem",
    }),
    input: style([
      componentStyles.input,
      {
        "@media": {
          "screen and (min-width: 768px)": {
            width: "100%",
          },
        },
      },
    ]),
    error: style([
      componentStyles.error,
      {
        marginTop: "0.4rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      componentStyles.secondary,
      { marginTop: "0.8rem" },
    ]),
  },
};

export const {
  searchForm,
  accountForm,
  pagenation,
  cardsWrapper,
  modal,
  card,
  addVideoForm,
} = unitStyles;
