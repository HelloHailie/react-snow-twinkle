import React from 'react';
import SnowTwinkle from '../src/SnowTwinkle';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h1>React Snow Twinkle Demo</h1>
      <SnowTwinkle />
    </div>
  );
}

export default App;
