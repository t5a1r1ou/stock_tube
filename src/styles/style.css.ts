import { globalStyle, style } from "@vanilla-extract/css";

import animations from "./animations.css";
import functions from "./functions.css";
import mixins from "./mixins.css";
import { colors } from "./variables.css";

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

export const layoutStyles = {
  wrapper: style({
    minHeight: ["100vh", "100dvh"],
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  }),
  header: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "4rem",
    backgroundColor: colors.primary,
  }),
  headerContainer: style({
    position: "relative",
    width: "90%",
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
  headerLeftButton: style([
    mixins.displayFlexCenter,
    {
      position: "absolute",
      margin: "auto 0",
      left: 0,
      top: 0,
      bottom: 0,
      width: "2.8rem",
      height: "2.8rem",
      fontSize: "1.6rem",
      borderRadius: "50%",
      backgroundColor: colors.lightPrimary,
    },
  ]),
  headerRightButton: style([
    mixins.displayFlexCenter,
    {
      position: "absolute",
      margin: "auto 0",
      right: 0,
      top: 0,
      bottom: 0,
      fontSize: "0.8rem",
    },
  ]),
  main: style({
    width: "90%",
    maxWidth: "800px",
    margin: "2rem auto 0",
  }),
  footer: style([
    mixins.displayFlexCenter,
    {
      width: "100%",
      height: ["3rem", "calc(3rem + env(safe-area-inset-bottom))"],
      borderTop: `1px solid ${colors.darkSecondary}`,
    },
  ]),
  footerText: style({
    fontSize: "1.1rem",
    color: colors.darkSecondary,
  }),
};

const colorStyles = {
  primary: style({
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
    fontWeight: "bold",
  }),
  secondary: style({
    color: colors.black,
    backgroundColor: colors.primary,
  }),
  alert: style({
    color: colors.white,
    backgroundColor: colors.error,
  }),
  error: style({
    color: colors.error,
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
    color: colors.darkSecondary,
  }),
  headingSideButtonActive: style({
    display: "inline-block",
    marginLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: colors.focus,
  }),
  input: style({
    border: `1px solid ${colors.darkSecondary}`,
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
    border: `2px solid ${colors.error}`,
    borderRadius: "5px",
    width: "100%",
    padding: "0.8rem",
    "@media": {
      "screen and (min-width: 768px)": {
        width: "70%",
      },
    },
  }),
  button: style([
    mixins.displayFlexCenter,
    {
      borderRadius: "5px",
      padding: "0.8rem 1.2rem",
      fontWeight: "bold",
      ":disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
    },
  ]),
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
  details: style({
    display: "block",
    marginTop: "0.4rem",
    fontSize: "0.8rem",
    color: colors.darkSecondary,
  }),
  floatingButton: {
    container: style({
      position: "fixed",
      right: "2rem",
      bottom: "5rem",
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      backgroundColor: colors.primary,
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
        backgroundColor: colors.white,
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
        backgroundColor: colors.white,
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
      border: `12px solid ${colors.primary}`,
      borderColor: `${colors.primary} transparent ${colors.primary} transparent`,
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
    backgroundColor: colors.white,
  }),
  backTo: style({
    display: "block",
    marginBottom: "1rem",
  }),
  hiddenText: style([mixins.visuallyHidden]),
  segmentControl: {
    wrapper: style({
      display: "flex",
      width: "100%",
      margin: "0 auto 2.4rem",
      "@media": {
        "screen and (min-width: 768px)": {
          width: "70%",
        },
      },
    }),
    button: style({
      flex: 1,
      textAlign: "center",
      padding: "0.8em",
      color: colors.primary,
      fontSize: "0.8rem",
      fontWeight: "bold",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: colors.secondary,
      ":first-of-type": {
        borderRight: "none",
        borderTopLeftRadius: "0.4rem",
        borderBottomLeftRadius: "0.4rem",
      },
      ":last-of-type": {
        borderLeft: "none",
        borderTopRightRadius: "0.4rem",
        borderBottomRightRadius: "0.4rem",
      },
      selectors: {
        "&[data-checked=true]": {
          backgroundColor: colors.primary,
          color: colors.black,
        },
        "&[data-checked=false]": {
          color: colors.darkSecondary,
        },
      },
    }),
  },
  menu: {
    container: style({
      display: "flex",
    }),
    button: style({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: "100%",
      height: "100%",
      backgroundColor: "currentColor",
      ":focus": {
        border: "0.2rem solid #0044CC",
      },
    }),
    buttonIcon: style({
      transform: "scale(1.5)",
    }),
    body: style({
      position: "absolute",
      top: "0",
      left: "calc(100% + 0.4rem)",
      right: "auto",
      display: "flex",
      flexDirection: "column",
      padding: "0.8rem 0",
      borderRadius: "0.4rem",
      backgroundColor: "#555",
      zIndex: 1,
      selectors: {
        "button[aria-expanded=true] + &": {
          display: "block",
        },
        "button[aria-expanded=false] + &": {
          display: "none",
        },
        ".rightPc &": {
          "@media": {
            "screen and (min-width: 768px)": {
              left: "calc(100% + 0.4rem)",
              right: "auto",
            },
          },
        },
        ".leftPc &": {
          "@media": {
            "screen and (min-width: 768px)": {
              left: "auto",
              right: "calc(100% + 0.4rem)",
            },
          },
        },
      },
    }),
    bodyButton: style({
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.8rem 1.6rem",
      color: colors.white,
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
    }),
    bodyButtonDelete: style([
      colorStyles.error,
      {
        width: "100%",
        padding: "0.8rem 1.6rem",
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
    buttonText: style({
      width: "max-content",
    }),
    menuIcon: style({
      marginRight: "0.4rem",
    }),
  },
};

const unitStyles = {
  searchForm: {
    container: style({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem",
      "@media": {
        "screen and (min-width: 768px)": {
          flexDirection: "row",
        },
      },
    }),
    input: style([componentStyles.input]),
    errorInput: style([componentStyles.errorInput]),
    errorText: style([
      colorStyles.error,
      {
        marginTop: "0.8rem",
        textAlign: "center",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      colorStyles.secondary,
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
      marginBottom: "0.4rem",
    }),
  },
  accountForm: {
    anker: style({
      textDecoration: "underline",
      color: colors.focus,
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
      color: colors.darkSecondary,
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
      colorStyles.error,
      {
        marginTop: "0.5rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      colorStyles.secondary,
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
    button: style([componentStyles.button, colorStyles.primary]),
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
    detailsContainer: style({
      textAlign: "right",
    }),
    details: style([componentStyles.details]),
    buttonContainer: style({
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }),
    box: style({
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "0.8rem",
    }),
    menuButtonContainer: style({
      position: "relative",
      width: "2.4rem",
      height: "2.4rem",
      color: colors.lightSecondary,
    }),
    button: style([
      componentStyles.button,
      colorStyles.secondary,
      {
        marginTop: "0.8rem",
      },
    ]),
    alertButton: style([
      componentStyles.button,
      colorStyles.alert,
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
      backgroundColor: colors.lightSecondary,
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
      colorStyles.primary,
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
      backgroundColor: colors.error,
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
        backgroundColor: colors.white,
      },
    }),
    menuButtonContainer: style({
      position: "absolute",
      left: "0.8rem",
      bottom: "0.8rem",
      width: "2.4rem",
      height: "2.4rem",
      color: colors.white,
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
  },
  editVideoForm: {
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
    details: style([componentStyles.details]),
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
        ...functions.triangle({
          direction: "downward",
          width: 0.8,
          height: 0.8,
          color: colors.secondary,
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
        color: colors.secondary,
        "@media": {
          "screen and (min-width: 768px)": {
            width: "100%",
          },
        },
      },
    ]),
    error: style([
      colorStyles.error,
      {
        marginTop: "0.4rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      colorStyles.secondary,
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
      colorStyles.error,
      {
        marginTop: "0.4rem",
      },
    ]),
    submitButton: style([
      componentStyles.button,
      colorStyles.secondary,
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
    button: style([componentStyles.button, colorStyles.primary]),
    buttonAlert: style([
      componentStyles.button,
      colorStyles.alert,
      {
        marginLeft: "0.4rem",
      },
    ]),
  },
  top: {
    wrapper: style({
      margin: "-2rem calc(50% - 50vw) 2rem",
      padding: "3.6rem 1rem",
      width: "100vw",
      backgroundColor: colors.lightSecondary,
      "@media": {
        "screen and (min-width: 768px)": {
          padding: "5.4rem 1rem",
        },
      },
    }),
    container: style({
      maxWidth: "800px",
      margin: "0 auto",
      "@media": {
        "screen and (min-width: 768px)": {
          display: "grid",
          gridTemplate: "'head image' auto 'description image' 1fr / 50% 50%",
        },
      },
    }),
    imageContainer: style({
      "@media": {
        "screen and (min-width: 768px)": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gridArea: "image",
        },
      },
    }),
    image: style({
      display: "block",
      margin: "0 auto",
      width: "85%",
      "@media": {
        "screen and (min-width: 768px)": {
          width: "100%",
        },
      },
    }),
    head: style({
      textAlign: "center",
      marginBottom: "3rem",
      fontSize: "1.2rem",
      "@media": {
        "screen and (min-width: 768px)": {
          marginBottom: 0,
          fontSize: "1.6rem",
          gridArea: "head",
        },
      },
    }),
    descriptionContainer: style({
      margin: "2rem 2rem 0",
      "@media": {
        "screen and (min-width: 768px)": {
          gridArea: "description",
        },
      },
    }),
    description: style({
      marginBottom: "1.2rem",
      lineHeight: 2,
      letterSpacing: "0.075em",
    }),
    signup: style([
      componentStyles.button,
      colorStyles.secondary,
      {
        marginBottom: "0.8rem",
        width: "100%",
      },
    ]),
    signin: style({
      color: colors.focus,
    }),
  },
  register: {
    container: style({
      padding: "0.4rem 0.4rem 0",
      "@media": {
        "screen and (min-width: 768px)": {
          padding: 0,
          display: "flex",
          alignItems: "center",
        },
      },
    }),
    imageContainer: style({
      "@media": {
        "screen and (min-width: 768px)": {
          flexBasis: "50%",
        },
      },
    }),
    image: style({
      display: "block",
      width: "85%",
      margin: "0 auto 1rem",
    }),
    textContainer: style({
      "@media": {
        "screen and (min-width: 768px)": {
          flexBasis: "50%",
        },
      },
    }),
    text: style({
      marginBottom: "1rem",
      fontSize: "1.2rem",
      textAlign: "center",
    }),
    button: style([
      componentStyles.button,
      colorStyles.secondary,
      {
        width: "100%",
      },
    ]),
    loginLink: style({
      display: "block",
      marginTop: "1.2rem",
      color: colors.focus,
      fontSize: "0.8rem",
      textAlign: "right",
    }),
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
  editFolderForm,
  editVideoForm,
  youtubePlayer,
  deleteConfirm,
  top,
  register,
} = unitStyles;
