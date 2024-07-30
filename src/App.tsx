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
          mark={Rect}
          data={alphabet}
          x="letter"
          y={0}
          width={10}
          height="frequency"
          fill="cornflowerblue"
        />
        <DiscreteLayout mark={Circle} data={alphabet} x="letter" y="frequency" width={7} height={7} fill="pink" />
      </Plot>
    </div>
  );
};

export default App;
