import { Component, For, createEffect, createMemo, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Encoding, createEncodingFn, isConstantEncoding } from "./encoding";
import { Continuous, DataRow, DataTable, Discrete, inferType, inferTypes } from "./datatypes";
import { scaleLinear, scaleOrdinal } from "./scales";

// Discrete Layout. For dots and bars and stuff
export type DiscreteLayoutProps<T extends DataRow> = {
  data: T[];
  x: Encoding<T>;
  y: Encoding<T>;
  width: Encoding<T>;
  height: Encoding<T>;
  mark: Component<{ x: number; y: number; width: number; height: number }>;
};

export const DiscreteLayout = <T extends DataRow>(props: DiscreteLayoutProps<T>) => {
  const [_, passThroughProps] = splitProps(props, ["data", "x", "y", "width", "height", "mark"]);

  const xEncodingFn = createMemo(() => createEncodingFn(props.x));
  const yEncodingFn = createMemo(() => createEncodingFn(props.y));
  const widthEncodingFn = createMemo(() => createEncodingFn(props.width));
  const heightEncodingFn = createMemo(() => createEncodingFn(props.height));

  const xEncoding = createMemo(() => props.data.map(xEncodingFn()));
  const yEncoding = createMemo(() => props.data.map(yEncodingFn()));
  const widthEncoding = createMemo(() => props.data.map(widthEncodingFn()));
  const heightEncoding = createMemo(() => props.data.map(heightEncodingFn()));

  const x = createMemo(() => {
    if (isConstantEncoding(props.data, props.x)) {
      // identity scale
      return (x: number) => x;
    }
    if (inferType(xEncoding()[0]) === "continuous") {
      const min = Math.min(...(xEncoding() as Continuous[]));
      const max = Math.max(...(xEncoding() as Continuous[]));
      return scaleLinear([min, max], [0, 500]);
    } else {
      return scaleOrdinal(xEncoding() as Discrete[], [0, 500]);
    }
  });

  const y = createMemo(() => {
    if (isConstantEncoding(props.data, props.y)) {
      // (inverted) identity scale
      return (x: number) => 500 - x;
    }
    if (inferType(yEncoding()[0]) === "continuous") {
      const min = Math.min(...(yEncoding() as Continuous[]));
      const max = Math.max(...(yEncoding() as Continuous[]));
      return scaleLinear([min, max], [500, 0]);
    } else {
      return scaleOrdinal(yEncoding() as Discrete[], [500, 0]);
    }
  });

  const width = createMemo(() => {
    if (isConstantEncoding(props.data, props.width)) {
      // identity scale
      return (x: number) => x;
    }
    const min = Math.min(...(widthEncoding() as Continuous[]));
    const max = Math.max(...(widthEncoding() as Continuous[]));
    return scaleLinear([min, max], [0, 500]);
  });

  const height = createMemo(() => {
    if (isConstantEncoding(props.data, props.height)) {
      // identity scale
      return (x: number) => x;
    }
    const min = Math.min(...(heightEncoding() as Continuous[]));
    const max = Math.max(...(heightEncoding() as Continuous[]));
    return scaleLinear([min, max], [0, 500]);
  });

  // createEffect(() => {
  //   console.log(xEncoding());
  //   console.log(x()(xEncoding()[0]));
  //   console.log(yEncoding());
  //   console.log(y()(yEncoding()[0]));
  // });

  return (
    <g>
      <For each={props.data}>
        {(_, i) => (
          <Dynamic
            component={props.mark}
            {...passThroughProps}
            x={
              isConstantEncoding(props.data, props.width)
                ? x()(xEncoding()[i()]) - width()(widthEncoding()[i()]) / 2
                : x()(xEncoding()[i()])
            }
            y={
              isConstantEncoding(props.data, props.height)
                ? y()(yEncoding()[i()]) - height()(heightEncoding()[i()]) / 2
                : y()(yEncoding()[i()]) - height()(heightEncoding()[i()])
            }
            width={width()(widthEncoding()[i()])}
            height={height()(heightEncoding()[i()])}
          />
        )}
      </For>
    </g>
  );
};
