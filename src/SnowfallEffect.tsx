import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

function SnowfallEffect({
  snowflakeCount = 50,
  fallSpeed = 2,
  flakeSize = 10,
  opacity = 1,
  flakeShape = "❄️",
  children,
}: SnowfallEffectProps) {
  // fallSpeed와 flakeSize에 대한 제한 적용
  const limitedFallSpeed = useMemo(() => 
    Math.min(Math.max(fallSpeed, 0.1), MAX_SPEED),
    [fallSpeed]
  );

  const limitedFlakeSize = useMemo(() => 
    typeof flakeSize === 'number' ? Math.min(Math.max(flakeSize, 1), MAX_SIZE) : flakeSize,
    [flakeSize]
  );

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  // 눈송이 배열 생성을 메모이제이션
  const snowflakes = useMemo(() => {
    const count = Math.min(snowflakeCount, MAX_FLAKES);
    return Array.from({ length: count }, (_, index) => {
      const startY = -((index * (dimensions.height * 2)) / count);
      return {
        id: index,
        startY,
        size: limitedFlakeSize === 'mix' ? Math.min(Math.random() * 3 + 4, MAX_SIZE) : limitedFlakeSize,
      };
    });
  }, [snowflakeCount, dimensions.height, limitedFlakeSize]);

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
}

export default React.memo(SnowfallEffect);
