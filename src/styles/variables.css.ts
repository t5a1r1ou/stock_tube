import functions from "./functions.css";

export const colors = {
  primary: "#FCC509",
  lightPrimary: functions.newShade({ hexColor: "#FCC509", rate: 150 }),
  darkPrimary: functions.newShade({ hexColor: "#FCC509", rate: -50 }),
  secondary: "#999",
  lightSecondary: "#ddd",
  darkSecondary: "#666",
  error: "#d9534f",
  focus: "#0044CC",
  white: "#fff",
  black: "#000",
};
