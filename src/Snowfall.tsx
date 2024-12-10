import React from "react";
import Snowflake from "./Snowflake";
import styles from "./styles/Snowfall.module.css";

interface SnowfallProps {
  numFlakes?: number;
  fallSpeed?: number;
  flakeSize?: number;
  opacity?: number;
  flakeShape?: string;
  children?: React.ReactNode;
}

const Snowfall: React.FC<SnowfallProps> = ({
  numFlakes = 50,
  fallSpeed = 5,
  flakeSize = 10,
  opacity = 1,
  flakeShape = "❄️",
  children,
}) => {
  return (
    <div className={styles.snowfallContainer}>
      {Array.from({ length: numFlakes }).map((_, i) => (
        <Snowflake
          key={i}
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

export default Snowfall;
