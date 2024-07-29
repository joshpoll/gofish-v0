import { Component, For, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

// Discrete Layout. For dots and bars and stuff
export type DiscreteLayoutProps<T> = {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  mark: Component<{ x: number; y: number }>;
};

export const DiscreteLayout = <T,>(props: DiscreteLayoutProps<T>) => {
  const [_, passThroughProps] = splitProps(props, ["data", "x", "y", "mark"]);

  return (
    <g>
      <For each={props.data}>
        {(d) => <Dynamic component={props.mark} {...passThroughProps} x={props.x(d)} y={props.y(d)} />}
      </For>
    </g>
  );
};
