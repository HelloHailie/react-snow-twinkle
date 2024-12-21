import SnowfallEffect from "../../src/SnowfallEffect";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <SnowfallEffect
        snowflakeCount={150}
        fallSpeed={3.5}
        flakeSize="mix"
        opacity={1}
        flakeShape="❄️"
      />
      <div className={styles.content}>
        <h1 className={styles.animatedTitle}>Animated Snow Effects</h1>
      </div>
    </div>
  );
}

export default App;