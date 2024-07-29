import { ParentProps } from "solid-js";

export type PlotProps = ParentProps<{
  width: number;
  height: number;
}>;

export const Plot = (props: PlotProps) => {
  return (
    <svg width={props.width} height={props.height}>
      {props.children}
    </svg>
  );
};
