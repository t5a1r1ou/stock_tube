type TriangleProps = {
  direction: "upward" | "rightward" | "downward" | "leftward";
  width: number;
  height: number;
  color?: string;
};

const functions = {
  triangle: ({
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
  },
};

export default functions;
