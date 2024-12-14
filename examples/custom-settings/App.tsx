import { useState } from "react";
import SnowfallEffect from "../../src/SnowfallEffect";
import styles from "./App.module.css";

const MAX_FLAKES = 700;
const MAX_SPEED = 20;
const MAX_SIZE = 100;

function App() {
  const [snowflakeCount, setsnowflakeCount] = useState(50);
  const [fallSpeed, setFallSpeed] = useState(5);
  const [flakeSize, setFlakeSize] = useState(10);

  return (
    <div className={styles.container}>
      <SnowfallEffect
        snowflakeCount={snowflakeCount}
        fallSpeed={fallSpeed}
        flakeSize={flakeSize}
      />
      <div className={styles.controls}>
        <label>
          Number of Flakes:
          <input
            type='range'
            min='1'
            max={MAX_FLAKES}
            value={snowflakeCount}
            onChange={(e) => setsnowflakeCount(Number(e.target.value))}
          />
        </label>
        <label>
          Fall Speed:
          <input
            type='range'
            min='1'
            max={MAX_SPEED}
            value={fallSpeed}
            onChange={(e) => setFallSpeed(Number(e.target.value))}
          />
        </label>
        <label>
          Flake Size:
          <input
            type='range'
            min='5'
            max={MAX_SIZE}
            value={flakeSize}
            onChange={(e) => setFlakeSize(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
