import { style, globalStyle, keyframes } from "@vanilla-extract/css";

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

const animations = {
  shakeAnimation: keyframes({
    "0%": {
      transform: "translateX(0)",
    },
    "10%": {
      transform: "translateX(-2px) rotate(-1deg)",
    },
    "20%": {
      transform: "translateX(2px) rotate(1deg)",
    },
    "30%": {
      transform: "translateX(-2px) rotate(-1deg)",
    },
    "40%": {
      transform: "translateX(2px) rotate(1deg)",
    },
    "50%": {
      transform: "translateX(-2px) rotate(-1deg)",
    },
    "60%": {
      transform: "translateX(2px) rotate(1deg)",
    },
    "70%": {
      transform: "translateX(-2px) rotate(-1deg)",
    },
    "80%": {
      transform: "translateX(2px) rotate(1deg)",
    },
    "90%": {
      transform: "translateX(-2px) rotate(-1deg)",
    },
    "100%": {
      transform: "translateX(2px) rotate(1deg)",
    },
  }),
  spinnerAnimation: keyframes({
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  }),
};

type TriangleProps = {
  direction: "upward" | "rightward" | "downward" | "leftward";
  width: number;
  height: number;
  color?: string;
};

const triangleFunc = ({
  direction,
  width,
  height,
  color = "currentColor",
}: TriangleProps) => {
  let params;
  switch (direction) {
    case "upward":
      params = {
        borderColor: `transparent transparent ${color} transparent`,
        borderWidth: `0 ${width / 2}rem ${height}rem ${width / 2}rem`,
      };
      break;
    case "rightward":
      params = {
        borderColor: `transparent transparent transparent ${color}`,
        borderWidth: `${height / 2}rem 0 ${height / 2}rem ${width}rem`,
      };
      break;
    case "downward":
      params = {
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: `${height}rem ${width / 2}rem 0 ${width / 2}rem`,
      };
      break;
    case "leftward":
      params = {
        borderColor: `transparent ${color} transparent transparent`,
        borderWidth: `${height / 2}rem ${width}rem ${height / 2}rem 0`,
      };
    default:
      break;
  }
  return {
    height: 0,
    width: 0,
    borderStyle: "solid",
    ...params,
  };
};

const primaryColor = "#FCC509";
const secondaryColor = "#999";
const lightSecondaryColor = "#ddd";
const darkSecondaryColor = "#666";
const errorColor = "#d9534f";
const focusColor = "#0044CC";

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
    backgroundColor: primaryColor,
  }),
  headerContainer: style({
    position: "relative",
    width: "100%",
    maxWidth: "800px",
  }),
  headerTitle: style({
    display: "block",
    width: "10rem",
    aspectRatio: "5 / 2",
    margin: "0 auto",
  }),
  headerLogo: style({
    width: "100%",
    height: "100%",
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
    fontSize: "1rem",
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
    fontSize: "1rem",
  }),
  main: style({
    width: "90%",
    maxWidth: "800px",
    margin: "2rem auto 0",
  }),
  footer: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "3rem",
    borderTop: `1px solid ${darkSecondaryColor}`,
  }),
  footerText: style({
    fontSize: "1.1rem",
    color: darkSecondaryColor,
  }),
};

export const componentStyles = {
  heading: style({
    marginBottom: "1.2rem",
    fontSize: "1.6rem",
  }),
  headingSideButton: style({
    display: "inline-block",
    marginLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: darkSecondaryColor,
  }),
  headingSideButtonActive: style({
    display: "inline-block",
    marginLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: focusColor,
  }),
  input: style({
    border: `1px solid ${darkSecondaryColor}`,
    borderRadius: "5px",
    width: "100%",
    padding: "0.8rem",
    "@media": {
      "screen and (min-width: 768px)": {
        width: "70%",
      },
    },
  }),
  errorInput: style({
    border: `2px solid ${errorColor}`,
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
    fontWeight: "bold",
    ":disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  }),
  primary: style({
    border: `1px solid ${primaryColor}`,
    color: primaryColor,
    fontWeight: "bold",
  }),
  secondary: style({
    color: "#fff",
    backgroundColor: primaryColor,
  }),
  alert: style({
    color: "#fff",
    backgroundColor: errorColor,
  }),
  error: style({
    color: errorColor,
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
    color: darkSecondaryColor,
  }),
  floatingButton: {
    container: style({
      position: "fixed",
      right: "2rem",
      bottom: "5rem",
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      backgroundColor: primaryColor,
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
  spinner: style({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "inline-block",
    width: "6.4rem",
    height: "6.4rem",
    ":after": {
      content: "",
      display: "block",
      width: "4.8rem",
      height: "4.8rem",
      margin: "0.8rem",
      borderRadius: "50%",
      border: `12px solid ${primaryColor}`,
      borderColor: `${primaryColor} transparent ${primaryColor} transparent`,
      animationName: animations.spinnerAnimation,
      animationDuration: "1.2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
  }),
  modalContainer: style({
    width: "80%",
    maxWidth: "800px",
    padding: "1.6rem",
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
    input: style([componentStyles.input]),
    errorInput: style([componentStyles.errorInput]),
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
      color: focusColor,
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
      color: darkSecondaryColor,
      "@media": {
        "screen and (min-width: 768px)": {
          width: "30%",
          marginRight: "1rem",
          marginBottom: "0",
        },
      },
    }),
    input: style([componentStyles.input]),
    errorInput: style([componentStyles.errorInput]),
    error: style([
      componentStyles.error,
      {
        marginTop: "0.5rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      componentStyles.secondary,
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
    alertButton: style([
      componentStyles.button,
      componentStyles.alert,
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
    editContainer: style({
      width: "50%",
      animationName: animations.shakeAnimation,
      animationDuration: "1.5s",
      animationIterationCount: "infinite",
      "@media": {
        "screen and (min-width: 768px)": {
          marginBottom: "0.8rem",
          width: "100%",
          animation: "none",
        },
      },
      selectors: {
        "&:nth-child(4n-1)": {
          animationDirection: "reverse",
        },
        "&:nth-child(4n-2)": {
          animationDirection: "reverse",
        },
      },
    }),
    card: style({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "0 0.4rem 1.2rem",
      padding: "1.2rem",
      backgroundColor: lightSecondaryColor,
      borderRadius: "0.4rem",
      aspectRatio: "1",
      cursor: "pointer",
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
      alignItems: "flex-end",
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
    deleteButton: style({
      position: "absolute",
      top: "-0.4rem",
      left: "-0.4rem",
      width: "1.6rem",
      height: "1.6rem",
      borderRadius: "50%",
      backgroundColor: errorColor,
      ":after": {
        content: "",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        width: "65%",
        height: "0.1rem",
        backgroundColor: "#fff",
      },
    }),
    menuButtonContainer: style({
      position: "absolute",
      left: "0.8rem",
      bottom: "0.8rem",
      width: "2.4rem",
      height: "2.4rem",
      "@media": {
        "screen and (min-width: 768px)": {
          top: 0,
          bottom: 0,
          left: "auto",
          right: "1.2rem",
          margin: "auto 0",
        },
      },
    }),
    menuButton: style({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
      ":focus": {
        border: "0.2rem solid #0044CC",
      },
    }),
    menuButtonIcon: style({
      transform: "scale(1.5)",
    }),
    menu: style({
      position: "absolute",
      top: "0",
      left: "calc(100% + 0.4rem)",
      width: "300%",
      padding: "0.8rem 0",
      borderRadius: "0.4rem",
      backgroundColor: "#555",
      zIndex: 1,
      "@media": {
        "screen and (min-width: 768px)": {
          left: "auto",
          right: "calc(100% + 0.4rem)",
        },
      },
      selectors: {
        "button[aria-expanded=true] + &": {
          display: "block",
        },
        "button[aria-expanded=false] + &": {
          display: "none",
        },
      },
    }),
    menuItem: style({
      padding: "0.8rem 1.2rem",
      color: "#fff",
      ":focus-visible": {
        backgroundColor: "#777",
      },
      "@media": {
        "screen and (min-width: 768px)": {
          ":hover": {
            backgroundColor: "#777",
          },
        },
      },
    }),
    menuItemDelete: style([
      componentStyles.error,
      {
        padding: "0.8rem 1.2rem",
        ":focus": {
          backgroundColor: "#777",
        },
        "@media": {
          "screen and (min-width: 768px)": {
            ":hover": {
              backgroundColor: "#777",
            },
          },
        },
      },
    ]),
    menuIcon: style({
      marginRight: "0.4rem",
    }),
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
        ...triangleFunc({
          direction: "downward",
          width: 0.8,
          height: 0.8,
          color: secondaryColor,
        }),
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
        color: secondaryColor,
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
    errorInput: style([
      componentStyles.errorInput,
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
  deleteConfirm: {
    heading: style({
      marginBottom: "1.6rem",
      fontSize: "1.6rem",
    }),
    desc: style({
      marginBottom: "2rem",
      fontSize: "1.2rem",
    }),
    buttonContainer: style({
      display: "flex",
      justifyContent: "flex-end",
    }),
    button: style([componentStyles.button, componentStyles.primary]),
    buttonAlert: style([
      componentStyles.button,
      componentStyles.alert,
      {
        marginLeft: "0.4rem",
      },
    ]),
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
  deleteConfirm,
} = unitStyles;
