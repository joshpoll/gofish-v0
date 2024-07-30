import { Component, For, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Encoding, createEncodingFn } from "./encoding";

// Discrete Layout. For dots and bars and stuff
export type DiscreteLayoutProps<T> = {
  data: T[];
  x: Encoding<T>;
  y: Encoding<T>;
  mark: Component<{ x: number; y: number }>;
};

export const DiscreteLayout = <T,>(props: DiscreteLayoutProps<T>) => {
  const [_, passThroughProps] = splitProps(props, ["data", "x", "y", "mark"]);

  const x = () => createEncodingFn(props.x);
  const y = () => createEncodingFn(props.y);

  return (
    <g>
      {/* TODO: remove casts after scaling */}
      <For each={props.data}>
        {(d) => <Dynamic component={props.mark} {...passThroughProps} x={x()(d) as number} y={y()(d) as number} />}
      </For>
    </g>
  );
};
