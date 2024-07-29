import { JSX } from "solid-js/jsx-runtime";

export type RectProps = JSX.RectSVGAttributes<SVGRectElement> & {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Rect = (props: RectProps) => {
  return <rect {...props} />;
};
