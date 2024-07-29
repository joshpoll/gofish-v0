import type { Component } from "solid-js";
import { Plot } from "./plot";
import { Rect } from "./marks/Rect";
import { Circle } from "./marks/Circle";
import { AlphabetType, alphabet } from "./datasets/alphabet";
import { DiscreteLayout } from "./discrete";

const App: Component = () => {
  return (
    <div>
      <Plot width={500} height={500}>
        <Rect x={100} y={100} width={100} height={100} fill="red" />
        <Circle x={200} y={200} width={100} height={100} fill="blue" />
        <DiscreteLayout
          data={alphabet}
          x={(d: AlphabetType) => d.frequency * 5000}
          y={(d: AlphabetType) => 30}
          mark={Rect}
          width={10}
          height={10}
          fill="cornflowerblue"
        />
      </Plot>
    </div>
  );
};

export default App;
