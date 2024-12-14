import React, { useEffect, useState, useCallback } from 'react';
import SnowflakeParticle from "./SnowflakeParticle";
import styles from "./styles/SnowfallEffect.module.css";

interface SnowfallEffectProps {
  snowflakeCount?: number;
  fallSpeed?: number;
  flakeSize?: number;
  opacity?: number;
  flakeShape?: string;
  children?: React.ReactNode;
}

const MAX_FLAKES = 700;
const MAX_SPEED = 20;
const MAX_SIZE = 100;

const SnowfallEffect: React.FC<SnowfallEffectProps> = ({
  snowflakeCount = 500,
  fallSpeed = 5,
  flakeSize = 10,
  opacity = 1,
  flakeShape = "❄️",
  children,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // ResizeObserver 설정
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    // document.documentElement를 관찰 대상으로 설정
    resizeObserver.observe(document.documentElement);

    // 초기 dimensions 설정
    updateDimensions();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 눈송이 개수, 속도, 크기를 최대값으로 제한
  const limitedFlakes = Math.min(snowflakeCount, MAX_FLAKES);
  const limitedSpeed = Math.min(fallSpeed, MAX_SPEED);
  const limitedSize = Math.min(flakeSize, MAX_SIZE);

  return (
    <div className={styles.snowfallContainer}>
      {Array.from({ length: limitedFlakes }).map((_, index) => (
        <SnowflakeParticle
          key={index}
          fallSpeed={limitedSpeed}
          size={limitedSize}
          opacity={opacity}
          shape={flakeShape}
          width={dimensions.width}
          height={dimensions.height}
        />
      ))}
      {children}
    </div>
  );
};

export default SnowfallEffect;
