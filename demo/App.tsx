import React from "react";
import Snowfall from "../src/Snowfall";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div>
      <Snowfall
        numFlakes={50}
        fallSpeed={2}
        flakeSize={20}
        opacity={1}
        flakeShape='❄️'
      >
        <div className={styles.test1}></div>
      </Snowfall>
      <div className={styles.test2}></div>
    </div>
  );
};

export default App;
