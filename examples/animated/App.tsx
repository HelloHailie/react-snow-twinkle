import { useState, useEffect } from 'react';
import SnowfallEffect from "../../src/SnowfallEffect";
import styles from './App.module.css';

function App() {
  const [speed, setSpeed] = useState(1);

  // 3~4 사이의 램덤한 속도를 생성
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.random() * 2 + 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className={styles.container}>
      <SnowfallEffect
        snowflakeCount={150}
        fallSpeed={speed}
        flakeSize={4}
        opacity={1}
        flakeShape="❄️"
      />
      <div className={styles.content}>
        <h1>Animated Snow Effects</h1>
        
        <p>Speed: {speed.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;