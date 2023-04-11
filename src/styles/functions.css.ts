type TriangleArgs = {
  direction: "upward" | "rightward" | "downward" | "leftward";
  width: number;
  height: number;
  color?: string;
};

type newShadeArgs = {
  hexColor: `#${string}`;
  rate: number;
};

const functions = {
  triangle: ({
    direction,
    width,
    height,
    color = "currentColor",
  }: TriangleArgs) => {
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
  },
  // https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
  newShade: ({ hexColor, rate }: newShadeArgs) => {
    const colorCode = hexColor.replace(`#`, ``);
    if (colorCode.length === 6) {
      const decimalColor = parseInt(colorCode, 16);
      let r = (decimalColor >> 16) + rate;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + rate;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + rate;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
      return hexColor;
    }
  },
};

export default functions;
