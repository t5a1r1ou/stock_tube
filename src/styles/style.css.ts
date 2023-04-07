import { style, globalStyle } from "@vanilla-extract/css";

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

export const mixin = {
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
};

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
  headerLeftButton: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    margin: "auto 0",
    left: "1.4rem",
    top: 0,
    bottom: 0,
    fontSize: "0.8rem",
  }),
  headerRightButton: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: "1.2rem",
    fontSize: "1.6rem",
  }),
  headingSideButton: style({
    display: "inline-block",
    marginLeft: "0.4rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#999",
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
  cardContainer: style({
    marginBottom: "2rem",
    width: "100%",
    wordWrap: "break-word",
    "@media": {
      "screen and (min-width: 768px)": {
        width: "calc(100% / 3)",
      },
    },
  }),
  videoContainer: style({
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
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
  floatingButton: {
    container: style({
      position: "fixed",
      right: "2rem",
      bottom: "5rem",
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      backgroundColor: "#999",
    }),
    iconAdd: style({
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      ":before": {
        content: "",
        position: "absolute",
        top: "calc(50% - 0.1rem)",
        left: 0,
        right: 0,
        margin: "0 auto",
        display: "block",
        width: "35%",
        height: "0.2rem",
        backgroundColor: "#fff",
      },
      ":after": {
        content: "",
        position: "absolute",
        left: "calc(50% - 0.1rem)",
        top: 0,
        bottom: 0,
        margin: "auto 0",
        display: "block",
        height: "35%",
        width: "0.2rem",
        backgroundColor: "#fff",
      },
    }),
  },
  modalContainer: style({
    width: "80%",
    maxWidth: "800px",
    padding: "1rem",
    backgroundColor: "#fff",
  }),
  backTo: style({
    display: "block",
    marginBottom: "1rem",
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
    container: style([componentStyles.modalContainer]),
    fullWidthContainer: style([
      componentStyles.modalContainer,
      {
        width: "100%",
        padding: 0,
      },
    ]),
  },
  videoCard: {
    container: style([
      componentStyles.cardContainer,
      {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        "@media": {
          "screen and (min-width: 768px)": {
            padding: "0.4rem",
          },
        },
      },
    ]),
    contentWrapper: style({
      width: "100%",
    }),
    imgContainer: style([
      componentStyles.videoContainer,
      {
        cursor: "pointer",
      },
    ]),
    img: style([componentStyles.img]),
    youtubeIcon: style({
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      width: "25%",
    }),
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
  folderCard: {
    container: style({
      width: "50%",
      "@media": {
        "screen and (min-width: 768px)": {
          marginBottom: "0.8rem",
          width: "100%",
        },
      },
    }),
    card: style({
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "0 0.4rem 0.4rem",
      padding: "1.2rem",
      backgroundColor: "#ddd",
      borderRadius: "0.4rem",
      aspectRatio: "6 / 7",
      "@media": {
        "screen and (min-width: 768px)": {
          margin: "0",
          aspectRatio: "auto",
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
          alignItems: "center",
        },
      },
    }),
    row: style({
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      alignItems: "flex-start",
      width: "100%",
      "@media": {
        "screen and (min-width: 768px)": {
          alignItems: "center",
        },
      },
    }),
    infoContainer: style({
      width: "100%",
    }),
    icon: style({
      textAlign: "right",
      fontSize: "calc(52 / 375 * 100vw)",
      "@media": {
        "screen and (min-width: 768px)": {
          fontSize: "3.2rem",
          marginRight: "0.8rem",
        },
      },
    }),
    title: style({
      marginBottom: "0.4rem",
      fontSize: "1.2rem",
      fontWeight: "bold",
    }),
    buttonContainer: style({
      margin: "0 0.4rem 0.4rem",
      "@media": {
        "screen and (min-width: 768px)": {
          margin: "0.4rem 0 0",
        },
      },
    }),
    editButton: style([
      componentStyles.button,
      componentStyles.primary,
      {
        width: "100%",
        marginBottom: "0.4rem",
      },
    ]),
    deleteButton: style([
      componentStyles.button,
      componentStyles.secondary,
      {
        width: "100%",
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
    selectContainer: style({
      position: "relative",
      ":after": {
        content: "",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: "0.6rem",
        margin: "auto 0",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0.8rem 0.4rem 0 0.4rem",
        borderColor: "#999 transparent transparent transparent",
      },
    }),
    select: style([
      componentStyles.input,
      {
        "@media": {
          "screen and (min-width: 768px)": {
            width: "100%",
          },
        },
      },
    ]),
    selectEmpty: style([
      componentStyles.input,
      {
        color: "#999",
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
  editFolderForm: {
    heading: style([componentStyles.heading]),
    inputBlock: style({
      marginTop: "1.2rem",
    }),
    inputLabel: style({
      display: "block",
      marginBottom: "0.4rem",
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
      {
        margin: "1.2rem auto 0",
      },
    ]),
  },
  youtubePlayer: {
    container: style({
      aspectRatio: "16 / 9",
    }),
    iframe: {
      width: "100%",
      height: "100%",
    },
  },
};

export const {
  searchForm,
  accountForm,
  pagenation,
  cardsWrapper,
  modal,
  videoCard,
  folderCard,
  addVideoForm,
  editFolderForm,
  youtubePlayer,
} = unitStyles;
