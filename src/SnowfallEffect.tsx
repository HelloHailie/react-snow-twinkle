import React, { useEffect, useState } from 'react';
import SnowflakeParticle from "./SnowflakeParticle";
import styles from "./styles/SnowfallEffect.module.css";

interface SnowfallEffectProps {
  snowflakeCount?: number;
  fallSpeed?: number;
  flakeSize?: number | 'mix';
  opacity?: number;
  flakeShape?: string;
  children?: React.ReactNode;
}

const MAX_FLAKES = 700;
const MAX_SPEED = 20;
const MAX_SIZE = 100;

const SnowfallEffect: React.FC<SnowfallEffectProps> = ({
  snowflakeCount = 50,
  fallSpeed = 2,
  flakeSize = 10,
  opacity = 1,
  flakeShape = "❄️",
  children,
}) => {
  // fallSpeed와 flakeSize에 대한 제한 적용
  const limitedFallSpeed = Math.min(Math.max(fallSpeed, 0.1), MAX_SPEED);
  const limitedFlakeSize = typeof flakeSize === 'number' ? Math.min(Math.max(flakeSize, 1), MAX_SIZE) : flakeSize;

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

  // 눈송이 배열 생성
  const snowflakes = Array.from({ length: Math.min(snowflakeCount, MAX_FLAKES) }, (_, index) => {
    // 화면 높이의 2배 범위에 걸쳐 분포시키기
    const startY = -((index * (dimensions.height * 2)) / snowflakeCount);
    return {
      id: index,
      startY,
      size: limitedFlakeSize === 'mix' ? Math.min(Math.random() * 3 + 4, MAX_SIZE) : limitedFlakeSize,
    };
  });

  return (
    <div className={styles.snowfallContainer}>
      {children}
      <div className={styles.snowfallEffect}>
        {snowflakes.map((flake) => (
          <SnowflakeParticle
            key={flake.id}
            fallSpeed={limitedFallSpeed}
            size={flake.size}
            opacity={opacity}
            shape={flakeShape}
            width={dimensions.width}
            height={dimensions.height}
            startY={flake.startY}
          />
        ))}
      </div>
    </div>
  );
};

export default SnowfallEffect;
