import React from 'react';
import SnowfallEffect from '../src/SnowfallEffect';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h1>React Snow Twinkle Demo</h1>
      <SnowfallEffect />
    </div>
  );
}

export default App;
