import { JSX } from "solid-js/jsx-runtime";

export type CircleProps = Omit<JSX.CircleSVGAttributes<SVGCircleElement>, "cx" | "cy" | "r"> & {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Circle = (props: CircleProps) => {
  const r = () => {
    return props.width / 2;
  };
  return <circle cx={props.x + r()} cy={props.y + r()} r={r()} {...props} />;
};
