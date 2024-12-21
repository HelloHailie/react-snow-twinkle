import { useState, useEffect } from "react";
import { Snowfall } from '../../index';
import styles from "./App.module.css";

const MAX_FLAKES = 700;
const MAX_SPEED = 20;
const MAX_SIZE = 100;

function App() {
  const [snowflakeCount, setsnowflakeCount] = useState(50);
  const [fallSpeed, setFallSpeed] = useState(5);
  const [flakeSize, setFlakeSize] = useState<number | 'mix'>(10);
  const [isMixSize, setIsMixSize] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [flakeShape, setFlakeShape] = useState('❄️');

  const emojiOptions = ['❄️', '⭐', '🌟', '✨', '♥️', '❅', '❆', '⚡', '🌸', '🎵'];

  useEffect(() => {
    if (isMixSize) {
      setFlakeSize('mix');
    } else {
      setFlakeSize(10);
    }
  }, [isMixSize]);

  return (
    <div className={styles.container}>
      <Snowfall
        snowflakeCount={snowflakeCount}
        fallSpeed={fallSpeed}
        flakeSize={flakeSize}
        opacity={opacity}
        flakeShape={flakeShape}
      />
      <div className={styles.controls}>
        <label>
          Number of Flakes:  {snowflakeCount}
          <input
            type='range'
            min='1'
            max={MAX_FLAKES}
            value={snowflakeCount}
            onChange={(e) => setsnowflakeCount(Number(e.target.value))}
          />
        </label>
        <label>
          Fall Speed: {fallSpeed}
          <input
            type='range'
            min='1'
            max={MAX_SPEED}
            value={fallSpeed}
            onChange={(e) => setFallSpeed(Number(e.target.value))}
          />
        </label>
        <label>
          Flake Size:  {typeof flakeSize === 'number' ? flakeSize : 'Mixed'}
          <div className={styles.sizeControl}>
            <input
              type='range'
              min='1'
              max={MAX_SIZE}
              value={typeof flakeSize === 'number' ? flakeSize : 10}
              onChange={(e) => setFlakeSize(Number(e.target.value))}
              disabled={isMixSize}
            />
            <div className={styles.mixToggle}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isMixSize}
                  onChange={(e) => setIsMixSize(e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Mix Sizes</span>
            </div>
          </div>
        </label>
        <label>
          Opacity: {opacity}
          <input
            type='range'
            min='0'
            max='1'
            step='0.1'
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
          />
        </label>
        <label>
          Flake Shape:
          <div className={styles.emojiContainer}>
            <input
              type='text'
              value={flakeShape}
              onChange={(e) => setFlakeShape(e.target.value)}
              placeholder="Type or select emoji"
            />
            <div className={styles.emojiList}>
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setFlakeShape(emoji)}
                  className={styles.emojiButton}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default App;
