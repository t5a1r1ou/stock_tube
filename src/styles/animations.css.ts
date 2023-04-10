import { keyframes } from "@vanilla-extract/css";

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

export default animations;
