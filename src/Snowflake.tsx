import React, { useEffect, useRef } from "react";
import "./styles/Snowflake.css";

interface SnowflakeProps {
  fallSpeed: number; // 낙하 속도
  size: number; // 눈송이 크기
  opacity: number; // 눈송이 투명도
  shape: string; // 눈송이 모양 (이모지, 텍스트 등)
}

const Snowflake: React.FC<SnowflakeProps> = ({
  fallSpeed,
  size,
  opacity,
  shape,
}) => {
  const flakeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const flake = flakeRef.current;
    if (!flake) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 초기 위치 설정
    const startX = Math.random() * width;
    const startY = Math.random() * -200; // 화면 상단에서 시작

    // 눈송이 위치와 스타일 초기화
    flake.style.left = `${startX}px`;
    flake.style.top = `${startY}px`;
    flake.style.fontSize = `${size}px`;
    flake.style.opacity = `${opacity}`;

    let startTime: number | null = null;

    // 눈송이 애니메이션 함수
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Y 위치 업데이트
      const y = startY + elapsed * fallSpeed * 50; // 속도 조절
      flake.style.top = `${y}px`;

      // X 위치 약간 흔들리게 하기
      const x = startX + Math.sin(elapsed * 2) * 10;
      flake.style.left = `${x}px`;

      if (y < height + 50) {
        requestAnimationFrame(animate);
      } else {
        // 화면을 벗어나면 다시 초기 위치로 재설정
        flake.style.top = `${Math.random() * -200}px`;
        startTime = null;
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [fallSpeed]);

  return (
    <div ref={flakeRef} className='snowflake'>
      {shape}
    </div>
  );
};

export default Snowflake;
