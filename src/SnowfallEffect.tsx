import React from 'react';
import SnowflakeParticle from "./SnowflakeParticle";
import styles from "./styles/SnowfallEffect.module.css";

interface SnowfallEffectProps {
  numFlakes?: number;
  fallSpeed?: number;
  flakeSize?: number;
  opacity?: number;
  flakeShape?: string;
  children?: React.ReactNode;
}

const SnowfallEffect: React.FC<SnowfallEffectProps> = ({
  numFlakes = 50,
  fallSpeed = 5,
  flakeSize = 10,
  opacity = 1,
  flakeShape = "❄️",
  children,
}) => {
  return (
    <div className={styles.snowfallContainer}>
      {Array.from({ length: numFlakes }).map((_, index) => (
        <SnowflakeParticle
          key={index}
          fallSpeed={fallSpeed}
          size={flakeSize}
          opacity={opacity}
          shape={flakeShape}
        />
      ))}
      {children}
    </div>
  );
};

export default SnowfallEffect;
