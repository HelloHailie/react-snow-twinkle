import React from "react";
import Snowfall from "../src/Snowfall";

const App: React.FC = () => {
  return (
    <div>
      <Snowfall
        numFlakes={10}
        fallSpeed={2}
        flakeSize={50}
        opacity={0.3}
        flakeShape='❄️'
      />
    </div>
  );
};

export default App;
