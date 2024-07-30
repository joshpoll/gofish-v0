import { Continuous, Discrete } from "./datatypes";

export type Interval = [number, number];

// fully AI generated... lol?
// used for continuous types
export const scaleLinear = (domain: Interval, range: Interval): ((x: Continuous) => number) => {
  const [x0, x1] = domain;
  const [y0, y1] = range;
  return (x: Continuous) => ((x - x0) / (x1 - x0)) * (y1 - y0) + y0;
};

// used for discrete types
export const scaleOrdinal = (domain: Discrete[], range: Interval): ((x: Discrete) => number | undefined) => {
  // evenly distribute domain values in range
  const rangeValues = Array.from(
    { length: domain.length },
    (_, i) => range[0] + (i * (range[1] - range[0])) / (domain.length - 1)
  );
  const map = new Map(domain.map((d, i) => [d, rangeValues[i]]));
  return (x: Discrete) => map.get(x);
};
