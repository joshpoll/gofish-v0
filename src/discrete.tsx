import { Component, For, createEffect, createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Encoding, createEncodingFn } from "./encoding";
import { Continuous, DataRow, DataTable, Discrete, inferType, inferTypes } from "./datatypes";
import { scaleLinear, scaleOrdinal } from "./scales";

// Discrete Layout. For dots and bars and stuff
export type DiscreteLayoutProps<T extends DataRow> = {
  data: T[];
  x: Encoding<T>;
  y: Encoding<T>;
  mark: Component<{ x: number; y: number }>;
};

export const DiscreteLayout = <T extends DataRow>(props: DiscreteLayoutProps<T>) => {
  const [_, passThroughProps] = splitProps(props, ["data", "x", "y", "mark"]);

  const xEncodingFn = createMemo(() => createEncodingFn(props.x));
  const yEncodingFn = createMemo(() => createEncodingFn(props.y));

  const xEncoding = createMemo(() => props.data.map(xEncodingFn()));
  const yEncoding = createMemo(() => props.data.map(yEncodingFn()));

  const x = createMemo(() => {
    if (inferType(xEncoding()[0]) === "continuous") {
      const min = Math.min(...(xEncoding() as Continuous[]));
      const max = Math.max(...(xEncoding() as Continuous[]));
      return scaleLinear([min, max], [0, 500]);
    } else {
      return scaleOrdinal(xEncoding() as Discrete[], [0, 500]);
    }
  });

  const y = createMemo(() => {
    if (inferType(yEncoding()[0]) === "continuous") {
      const min = Math.min(...(yEncoding() as Continuous[]));
      const max = Math.max(...(yEncoding() as Continuous[]));
      return scaleLinear([min, max], [500, 0]);
    } else {
      return scaleOrdinal(yEncoding() as Discrete[], [500, 0]);
    }
  });

  createEffect(() => {
    console.log(xEncoding());
    console.log(x()(xEncoding()[0]));
  });

  return (
    <g>
      {/* TODO: remove casts after scaling */}
      <For each={props.data}>
        {(_, i) => (
          <Dynamic component={props.mark} {...passThroughProps} x={x()(xEncoding()[i()])} y={y()(yEncoding()[i()])} />
        )}
      </For>
    </g>
  );
};
