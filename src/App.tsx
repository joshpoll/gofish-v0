import type { Component } from "solid-js";
import { Plot } from "./plot";
import { Rect } from "./marks/Rect";
import { Circle } from "./marks/Circle";

const App: Component = () => {
  return (
    <div>
      <Plot width={500} height={500}>
        <Rect x={100} y={100} width={100} height={100} fill="red" />
        <Circle x={200} y={200} width={100} height={100} fill="blue" />
      </Plot>
    </div>
  );
};

export default App;
