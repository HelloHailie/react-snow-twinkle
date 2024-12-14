import React from "react";
import Snowflake from "./Snowflake";
import styles from "./styles/SnowTwinkle.module.css";

interface SnowTwinkleProps {
  numFlakes?: number;
  fallSpeed?: number;
  flakeSize?: number;
  opacity?: number;
  flakeShape?: string;
  children?: React.ReactNode;
}

const SnowTwinkle: React.FC<SnowTwinkleProps> = ({
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
        <Snowflake
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

export default SnowTwinkle;
